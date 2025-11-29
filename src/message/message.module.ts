import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { mercadopagoProvider } from 'src/mercadopago/mercadopago.provider';
import { VentasModule } from 'src/ventas/ventas.module';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), VentasModule],
  controllers: [MessageController],
  providers: [MessageService, mercadopagoProvider],
  // Exportamos el servicio para usarlo en otros módulos (ej: MercadoPagoModule)
  exports: [MessageService, mercadopagoProvider],
})
export class MessageModule {}
