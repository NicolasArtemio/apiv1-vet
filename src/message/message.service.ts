import { Inject, Injectable } from '@nestjs/common';
import MercadoPagoConfig, { Preference } from 'mercadopago';
import { Message } from './entities/message.entity';
import { MERCADO_PAGO_CLIENT } from 'src/mercadopago/mercadopago.provider';

@Injectable()
export class MessageService {
  constructor(
    @Inject(MERCADO_PAGO_CLIENT)
    private readonly mercadopagoClient: MercadoPagoConfig,
  ) {}

  // Simulación de tu base de datos
  private messages: Message[] = [];

  /**
   * Crea una preferencia de pago.
   */
  async createPaymentPreference(text: string): Promise<string> {
    // 2. 🛑 CAMBIO CRÍTICO: Usar this.mercadopagoClient
    const preference = await new Preference(this.mercadopagoClient).create({
      body: {
        items: [
          // ... (items) ...
        ],
        notification_url:
          'https://tu-dominio.com/api/mercadopago/notifications',
        metadata: {
          text,
        },
      },
    });

    return preference.init_point!;
  }

  /**
   * Agrega el mensaje a la "DB" (simulación) después de la aprobación.
   */
  addMessage(messageId: string, text: string) {
    // 💡 Corrección de TS: msg ahora tiene una propiedad 'id' definida
    if (this.messages.some((msg) => msg.id === messageId)) {
      console.log(`Mensaje con ID ${messageId} ya existe. Saltando.`);
      throw new Error('Message already added');
    }

    // 💡 Corrección de TS: Tipamos el objeto al crearlo
    const newMessage: Message = { id: messageId, text, createdAt: new Date() };

    // 💡 Corrección de TS: El tipo del objeto ahora coincide con el array
    this.messages.push(newMessage);
    console.log('Nuevo mensaje agregado:', newMessage);
  }

  // 💡 Corrección de ESLint: Eliminamos 'async' ya que no hay 'await'
  // 💡 Opcional: Especificamos el tipo de retorno para mayor claridad
  listMessages(): Message[] {
    return this.messages;
  }
}
