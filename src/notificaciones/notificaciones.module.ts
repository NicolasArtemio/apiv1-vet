import { Module } from '@nestjs/common';
import { NotificacionesService } from './notificaciones.service';
import { NotificacionesController } from './notificaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notificacion } from './entities/notificacion.entity';
import { NotificacionesGateway } from './notificaciones.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Notificacion])],
  providers: [NotificacionesService, NotificacionesGateway],
  controllers: [NotificacionesController],
  exports: [NotificacionesService, NotificacionesGateway],
})
export class NotificacionesModule {}
