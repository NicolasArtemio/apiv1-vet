import { Injectable } from '@nestjs/common';
import { MercadoPagoConfig, Preference } from 'mercadopago';

interface PaymentBody {
  title: string;
  price: number | string;
}

@Injectable()
export class MercadoPagoService {
  private client: MercadoPagoConfig;

  constructor() {
    this.client = new MercadoPagoConfig({
      accessToken: 'TEST-00000000-0000-0000-0000-000000000000',
      options: { timeout: 5000 },
    });
  }

  async createPreference(body: PaymentBody) {
    const preference = new Preference(this.client);

    try {
      const result = await preference.create({
        body: {
          items: [
            {
              id: '1234',
              title: body.title,
              quantity: 1,
              unit_price: Number(body.price),
              currency_id: 'ARS',
            },
          ],
          back_urls: {
            success: 'https://tusitio.com/success',
            failure: 'https://tusitio.com/failure',
            pending: 'https://tusitio.com/pending',
          },
          auto_return: 'approved',
          notification_url: 'https://tu-api-nest.com/mercado-pago/webhook',
        },
      });

      return {
        id: result.id,
        url: result.init_point,
      };
    } catch (error) {
      console.error('Error al crear preferencia:', error);
      throw error;
    }
  }
}
