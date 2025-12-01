import { Module } from '@nestjs/common';
import { TurnoService } from './turno.service';
import { TurnoController } from './turno.controller';
import { Turno } from './entities/turno.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notificacion } from '../notificaciones/entities/notificacione.entity';
import { NotificacionesGateway } from '../notificaciones/notificaciones.gateway';
import { NotificacionesService } from '../notificaciones/notificaciones.service';

@Module({
  imports: [TypeOrmModule.forFeature([Turno, Notificacion])],
  controllers: [TurnoController],
  providers: [TurnoService, NotificacionesService, NotificacionesGateway],
  exports: [TurnoService],
})
export class TurnoModule {}
