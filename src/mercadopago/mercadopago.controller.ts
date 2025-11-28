import { Controller, Post, Body, HttpCode, Inject } from '@nestjs/common';
import MercadoPagoConfig, { Payment } from 'mercadopago';
import { MessageService } from '../message/message.service';
import { MERCADO_PAGO_CLIENT } from './mercadopago.provider';

interface MessageMetadata {
  text: string;
}

@Controller('mercadopago')
export class MercadoPagoController {
  constructor(
    private readonly messageService: MessageService,
    @Inject(MERCADO_PAGO_CLIENT)
    private readonly mercadopagoClient: MercadoPagoConfig,
  ) {}

  @Post('notifications')
  @HttpCode(200)
  async handleNotification(@Body() body: { data?: { id?: string } }) {
    console.log('Notificación de Mercado Pago recibida:', body);

    const paymentId = body.data?.id;

    if (!paymentId) {
      console.error('Notificación sin ID de pago');
      return;
    }

    try {
      //  CORRECCIÓN 2: Usar this.mercadopagoClient
      const payment = await new Payment(this.mercadopagoClient).get({
        id: paymentId,
      });

      if (payment.status === 'approved') {
        const metadata = payment.metadata as unknown as MessageMetadata;
        const messageText: string = metadata.text;

        // Nota: Cambié la re-declaración de paymentId a una constante si es necesario,
        // pero la validación 'payment.id!' ya es correcta en el contexto.
        const approvedPaymentId: string = payment.id!.toString();

        // Notamos que la llamada al servicio NO usa await (asumiendo que es síncrono como corregimos)
        this.messageService.addMessage(approvedPaymentId, messageText);
      } else {
        console.log(`Pago ${paymentId} no aprobado. Estado: ${payment.status}`);
      }
    } catch (error) {
      console.error('Error al procesar la notificación de pago:', error);
      throw error;
    }
  }
}
