import { Injectable, Inject } from '@nestjs/common';
import { Preference, MercadoPagoConfig } from 'mercadopago';
import { MERCADO_PAGO_CLIENT } from 'src/mercadopago/mercadopago.provider';

// 🛑 PASO 1: DEFINIR INTERFACES
// Asegúrate de que estas interfaces estén definidas en un archivo accesible (ej: types.ts)
// La interfaz Message es CRÍTICA para que `this.messages` se tipifique correctamente
interface Message {
  id: string;
  text: string;
  createdAt: Date;
}

// La interfaz para los ítems del carrito (debe coincidir con ProductoCheckoutDto)
interface ProductoCheckoutDto {
  id: string;
  title: string;
  unit_price: number;
  quantity: number;
}

@Injectable()
export class MessageService {
  constructor(
    @Inject(MERCADO_PAGO_CLIENT)
    private readonly mercadopagoClient: MercadoPagoConfig,
  ) {} // 🛑 CORRECCIÓN TS: Tipar la propiedad `messages` para evitar errores de tipo 'never'

  private messages: Message[] = [];

  // ----------------------------------------------------
  // 🎯 NUEVA FUNCIONALIDAD: CARRITO DE COMPRAS
  // ----------------------------------------------------

  /**
   * Crea una preferencia de pago usando un array de ítems (desde el carrito).
   */
  public async createPreferenceFromItems(
    items: ProductoCheckoutDto[],
  ): Promise<string> {
    // El mapeo es simple ya que ProductoCheckoutDto coincide con la estructura de MP
    const mpItems = items.map((item) => ({
      id: item.id,
      title: item.title,
      unit_price: item.unit_price,
      quantity: item.quantity,
    }));

    const preference = await new Preference(this.mercadopagoClient).create({
      body: {
        items: mpItems,

        notification_url:
          'https://tu-dominio.com/api/mercadopago/notifications',
      },
    });

    if (!preference.init_point) {
      throw new Error('Mercado Pago no devolvió la URL de pago (init_point).');
    }

    return preference.init_point;
  } /**
   * Crea una preferencia de pago (versión de mensaje único).
   */

  // ----------------------------------------------------
  // MANTENIMIENTO (Método de mensaje único - Puedes eliminar si no lo usas)
  // ----------------------------------------------------

  async createPaymentPreference(text: string): Promise<string> {
    const preference = await new Preference(this.mercadopagoClient).create({
      body: {
        items: [
          {
            id: 'consulta-1',
            title: 'Consulta Veterinaria',
            quantity: 1,
            unit_price: 1500,
          },
        ],
        notification_url:
          'https://tu-dominio.com/api/mercadopago/notifications',
        metadata: {
          text,
        },
      },
    });

    if (!preference.init_point) {
      throw new Error('Mercado Pago no devolvió la URL de pago (init_point).');
    }

    return preference.init_point;
  } /**
   * Agrega el mensaje a la "DB" (simulación) después de la aprobación.
   */ // 🛑 CORRECCIÓN ESLint: Se elimina 'async'

  // ----------------------------------------------------
  // 🛑 CORRECCIONES CRÍTICAS DE ESLINT/TS (Persistencia)
  // ----------------------------------------------------

  addMessage(messageId: string, text: string) {
    if (this.messages.some((msg) => msg.id === messageId)) {
      console.log(`Mensaje con ID ${messageId} ya existe. Saltando.`);
      throw new Error('Message already added');
    } // El tipado y la estructura ahora funcionan correctamente

    const newMessage: Message = { id: messageId, text, createdAt: new Date() };

    this.messages.push(newMessage);
    console.log('Nuevo mensaje agregado:', newMessage);
  } /**
   * Obtiene la lista de mensajes.
   */ // 🛑 CORRECCIÓN ESLint: Se elimina 'async'

  listMessages(): Message[] {
    return this.messages;
  }
}
