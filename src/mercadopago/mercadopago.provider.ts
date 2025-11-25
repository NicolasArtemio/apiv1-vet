import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MercadoPagoConfig } from 'mercadopago';

// Clave bajo la cual se inyectará el cliente
export const MERCADO_PAGO_CLIENT = 'MERCADO_PAGO_CLIENT';

// La factoría crea la instancia usando el ConfigService
export const mercadopagoProvider: FactoryProvider<MercadoPagoConfig> = {
  provide: MERCADO_PAGO_CLIENT,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    // Obtenemos el token de forma segura (ConfigService ya lo cargó)
    const accessToken = configService.getOrThrow<string>(
      'MERCADO_PAGO_ACCESS_TOKEN',
    );

    return new MercadoPagoConfig({
      accessToken: accessToken,
      options: { timeout: 5000 },
    });
  },
};
