import { Module } from '@nestjs/common';
import { MercadoPagoController } from './mercadopago.controller';
import { MessageModule } from '../message/message.module';
@Module({
  imports: [MessageModule],
  controllers: [MercadoPagoController],
})
export class MercadoPagoModule {}
