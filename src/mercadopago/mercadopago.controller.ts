import { Controller, Post, Body, HttpCode, Inject } from '@nestjs/common';
import MercadoPagoConfig, { Payment } from 'mercadopago';
import { MessageService } from '../message/message.service';
import { MERCADO_PAGO_CLIENT } from './mercadopago.provider';
import { MPItem } from 'src/common/interfaces/mpitem.interface';

interface MessageMetadata {
  text: string;
}

interface MpNotificationBody {
  type: string;
  data?: {
    id: string;
  };
}

interface PaymentAdditionalInfo {
  items: MPItem[];
}

@Controller('mercadopago')
export class MercadoPagoController {
  constructor(
    private readonly messageService: MessageService, // Contiene la lógica de simulación
    @Inject(MERCADO_PAGO_CLIENT)
    private readonly mercadopagoClient: MercadoPagoConfig,
  ) {}

  @Post('notifications')
  @HttpCode(200) // Responder 200 (OK) siempre para evitar reintentos infinitos
  async handleNotification(@Body() body: MpNotificationBody) {
    // Solo procesamos pagos; ignoramos otros tipos de notificación (ej: merchant_order)
    if (body.type !== 'payment') {
      return { status: 'Ignored type' }; // Responder 200 (OK)
    }

    const paymentId = body.data?.id;

    if (!paymentId) {
      console.error('Notificación de tipo ' + body.type + ' sin ID de recurso');
      return { status: 'No ID' }; // Responder 200 (OK)
    }

    try {
      // 1. Obtener el pago con todos los detalles
      const payment = await new Payment(this.mercadopagoClient).get({
        id: paymentId,
      });

      if (payment.status === 'approved') {
        const clienteEmail: string =
          payment.payer?.email || 'email-no-disponible'; // Extracción de Metadatos

        const metadata = payment.metadata as unknown as MessageMetadata;
        const referenciaOrden: string = metadata.text; // ID de Pago de Mercado Pago (MP)

        const approvedPaymentId: string = payment.id!.toString(); // 🛑 Corrección: Acceso a items mediante additional_info.items

        const itemsComprados =
          (payment.additional_info as PaymentAdditionalInfo)?.items || [];
        // Si hubieras implementado el VentaService, cambiarías 'messageService' por 'ventaService'.

        this.messageService.guardarOrdenAprobada(
          approvedPaymentId,
          referenciaOrden,
          clienteEmail,
          itemsComprados,
        );

        console.log(`Notificación procesada con éxito para pago: ${paymentId}`);
      } else {
        console.log(`Pago ${paymentId} no aprobado. Estado: ${payment.status}`);
      }

      // Es crucial responder 200 (OK) al final, sin importar el resultado del pago.
      return { status: 'OK' };
    } catch (error) {
      console.error('Error al procesar la notificación de pago:', error); // pero para mayor seguridad, retornamos 200 y logueamos el error.
      // Retornar 200 (OK) para MP, pero podrías retornar 500 si quieres que reintente
      return { status: 'Error', message: 'Internal processing error' };
    }
  }
}
