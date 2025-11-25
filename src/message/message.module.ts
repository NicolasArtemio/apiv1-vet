import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { mercadopagoProvider } from 'src/mercadopago/mercadopago.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  controllers: [MessageController],
  providers: [MessageService, mercadopagoProvider],
  // Exportamos el servicio para usarlo en otros módulos (ej: MercadoPagoModule)
  exports: [MessageService, mercadopagoProvider],
})
export class MessageModule {}
