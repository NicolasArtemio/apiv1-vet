import { Controller, Post, Body, HttpCode, Inject } from '@nestjs/common';
import MercadoPagoConfig, { Payment } from 'mercadopago';
import { MERCADO_PAGO_CLIENT } from './mercadopago.provider';
import { VentasService } from 'src/ventas/ventas.service';
import { MPItem } from 'src/common/interfaces/mpitem.interface';
export interface MPMetaData {
  email_cliente?: string;
  referenciaOrden?: string;
  items?: MPItem[];
}

export interface MpNotificationBody {
  type: string;
  data: { id: number };
}

@Controller('mercadopago')
export class MercadoPagoController {
  constructor(
    private readonly ventaService: VentasService,
    @Inject(MERCADO_PAGO_CLIENT)
    private readonly mercadopagoClient: MercadoPagoConfig,
  ) {}

  @Post('notifications')
  @HttpCode(200)
  async handleNotification(@Body() body: MpNotificationBody) {
    console.log('📩 Notificación recibida:', body);

    // Aceptar Mercado Pago real y Postman
    if (body.type !== 'payment' && body.type !== 'test') {
      console.log('🔹 Notificación ignorada. Tipo:', body.type);
      return { status: 'Ignored' };
    }

    const paymentId = body.data?.id;

    if (!paymentId) {
      console.error('❌ Notificación sin ID');
      return { status: 'No payment ID' };
    }

    if (body.type === 'test') {
      console.log('🧪 Webhook de simulación recibido. Saltando consulta a MP.');
      return { status: 'test ok' };
    }

    try {
      // Obtener pago desde Mercado Pago
      const payment = await new Payment(this.mercadopagoClient).get({
        id: paymentId,
      });

      console.log(`💳 Pago ${paymentId} recibido. Estado: ${payment.status}`);

      if (payment.status === 'approved') {
        const metadata = payment.metadata as MPMetaData;

        const clienteEmail =
          metadata?.email_cliente ||
          payment.payer?.email ||
          'email-no-disponible';

        const detalles: MPItem[] = metadata.items || [];
        const referenciaOrden = metadata.referenciaOrden || '';

        console.log('🧾 Datos reconstruidos:', {
          referenciaOrden,
          clienteEmail,
          detalles,
        });

        const venta = await this.ventaService.crearVentaDesdeMercadoPago(
          payment.id!.toString(),
          referenciaOrden,
          clienteEmail,
          detalles,
        );

        console.log(`✅ Venta guardada. ID: ${venta.id_compra}`);
      }

      return { status: 'OK' };
    } catch (error) {
      console.error('🔥 Error procesando notificación:', error);
      return { status: 'Error' };
    }
  }
}
