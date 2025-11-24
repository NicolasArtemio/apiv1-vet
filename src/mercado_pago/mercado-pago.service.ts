import { Injectable } from '@nestjs/common';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { CreatePreferenceDto } from './dto/preference-dto';

@Injectable()
export class MercadoPagoService {
  private client: MercadoPagoConfig;

  constructor() {
    this.client = new MercadoPagoConfig({
      accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || '',
      options: { timeout: 5000 },
    });
  }

  async createPreference(body: CreatePreferenceDto) {
    const preference = new Preference(this.client);

    try {
      const result = await preference.create({
        body: {
          items: [
            {
              id: '1234',
              title: body.title,
              quantity: body.quantity,
              unit_price: body.price,
              currency_id: 'ARS',
            },
          ],
          back_urls: {
            success: 'https://tunsitio.com/success',
            failure: 'https://tunsitio.com/failure',
            pending: 'https://tunsitio.com/pending',
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
