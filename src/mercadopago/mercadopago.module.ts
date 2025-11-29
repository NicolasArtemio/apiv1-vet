import { Module } from '@nestjs/common';
import { MercadoPagoController } from './mercadopago.controller';
import { MessageModule } from '../message/message.module';
import { VentasModule } from 'src/ventas/ventas.module';
@Module({
  imports: [MessageModule, VentasModule],
  controllers: [MercadoPagoController],
})
export class MercadoPagoModule {}
