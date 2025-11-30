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

interface MPGetPaymentResponse {
  status?: string;
  payer?: {
    email?: string;
  };
  metadata?: MPMetaData;
  external_reference?: string;
  additional_info?: {
    items?: Array<{
      id: string;
      title: string;
      quantity: number;
      unit_price: number;
    }>;
  };
  id?: string | number;
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

    // Filtrar solo lo relevante
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
      console.log('🧪 Webhook de simulación recibido.');
      return { status: 'test ok' };
    }

    try {
      // 1️⃣ Obtener pago REAL
      const payment = (await new Payment(this.mercadopagoClient).get({
        id: paymentId,
      })) as MPGetPaymentResponse;

      console.log(`💳 Pago ${paymentId} recibido. Estado: ${payment.status}`);

      if (payment.status === 'approved') {
        // 2️⃣ OBTENER EMAIL
        const clienteEmail =
          payment.payer?.email ||
          payment.metadata?.email_cliente ||
          'email-no-disponible';

        // 3️⃣ OBTENER ITEMS REALES DEL PAGO
        const detalles: MPItem[] =
          payment.additional_info?.items?.map((i) => ({
            id: i.id,
            title: i.title,
            quantity: i.quantity,
            unit_price: i.unit_price,
          })) ?? [];

        // 4️⃣ OBTENER REFERENCIA SI LA USASTE
        const referenciaOrden = payment.external_reference || '';

        console.log('🧾 Datos reconstruidos:', {
          referenciaOrden,
          clienteEmail,
          detalles,
        });

        if (detalles.length === 0) {
          console.error('❌ No se recibieron items en el pago.');
        }

        // 5️⃣ GUARDAR LA VENTA
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
