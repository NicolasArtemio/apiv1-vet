import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Preference, MercadoPagoConfig } from 'mercadopago';
import { MPItem } from 'src/common/interfaces/mpitem.interface';
import { MERCADO_PAGO_CLIENT } from 'src/mercadopago/mercadopago.provider';
import { ProductosService } from 'src/productos/productos.service';
import { VentasService } from 'src/ventas/ventas.service';

interface Message {
  id: string;
  text: string;
  createdAt: Date;
}

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
    // 🎯 Inyectar VentaService para usar la lógica de DB
    private readonly ventaService: VentasService,
    private readonly productoService: ProductosService,
  ) {}

  private messages: Message[] = [];

  /**
   * Crea una preferencia de pago usando un array de ítems (desde el carrito).
   */

  public async createPreferenceFromItems(
    items: ProductoCheckoutDto[],
    clienteEmail?: string, // opcional pero recomendable
  ): Promise<string> {
    const mpItemsPromises = items.map(async (itemDelFront) => {
      const idString = itemDelFront.id.toString();
      const idProductoNum = parseInt(idString);

      const productoDB = await this.productoService.findOne(idProductoNum);

      if (!productoDB) {
        throw new NotFoundException(
          `Producto con ID ${itemDelFront.id} no encontrado.`,
        );
      }

      return {
        id: productoDB.id.toString(),
        title: productoDB.descripcion,
        unit_price: Number(productoDB.precio),
        quantity: itemDelFront.quantity,
      };
    });

    const mpItems = await Promise.all(mpItemsPromises);

    const preference = await new Preference(this.mercadopagoClient).create({
      body: {
        items: mpItems,
        notification_url:
          'https://apiv1-vet.onrender.com/api/v1/mercadopago/notifications',

        // 🟩 AGREGADO: esto es lo que el webhook necesita
        metadata: {
          referenciaOrden: `orden-${Date.now()}`,
          email_cliente: clienteEmail ?? 'email-no-enviado',
          items: mpItems, // 🔥 CLAVE para que no llegue vacío
        },
      },
    });

    if (!preference.init_point) {
      throw new Error('Mercado Pago no devolvió la URL de pago (init_point).');
    }

    return preference.init_point;
  } /**
   * Crea una preferencia de pago (versión de mensaje único).
   */

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
          'https://apiv1-vet.onrender.com/api/v1/mercadopago/notifications',
        metadata: {
          text,
        },
      },
    });

    if (!preference.init_point) {
      throw new Error('Mercado Pago no devolvió la URL de pago (init_point).');
    }

    return preference.init_point;
  }

  /**
   * Guarda los datos de una orden aprobada en la DB (simulación/real).
   * Este método resuelve el error de tipado en el MercadoPagoController.
   */

  public async guardarOrdenAprobada(
    // 🛑 Hacer el método ASYNC
    paymentIdMP: string,
    referenciaOrden: string,
    clienteEmail: string,
    itemsComprados: MPItem[],
  ) {
    // 🛑 Reemplazar la simulación con la llamada al VentaService
    const ventaGuardada = await this.ventaService.crearVentaDesdeMercadoPago(
      paymentIdMP,
      referenciaOrden,
      clienteEmail,
      itemsComprados,
    );

    // Opcional: Mantener un log para confirmar que la persistencia fue exitosa
    console.log(
      `[DB REAL LOG] Venta #${ventaGuardada.id_compra} creada. MP ID: ${paymentIdMP}`,
    );

    // 🛑 Opcional: Si quieres mantener el historial de mensajes interno,
    // puedes seguir usando addMessage, pero ya no es la lógica central.
    // this.addMessage(paymentIdMP, referenciaOrden);
  }
  /**
   * Agrega el mensaje a la "DB" (simulación) después de la aprobación.
   */

  addMessage(messageId: string, text: string) {
    if (this.messages.some((msg) => msg.id === messageId)) {
      console.log(`Mensaje con ID ${messageId} ya existe. Saltando.`);
      throw new Error('Message already added');
    }

    const newMessage: Message = { id: messageId, text, createdAt: new Date() };

    this.messages.push(newMessage);
    console.log('Nuevo mensaje agregado:', newMessage);
  } /**
   * Obtiene la lista de mensajes.
   */

  listMessages(): Message[] {
    return this.messages;
  }
}
