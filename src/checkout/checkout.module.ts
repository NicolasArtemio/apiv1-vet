import { Module } from '@nestjs/common';
import { MessageModule } from '../message/message.module';
import { CheckoutController } from './checkout.controler';

@Module({
  imports: [MessageModule],
  controllers: [CheckoutController],
})
export class CheckoutModule {}
