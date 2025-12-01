import { forwardRef, Module } from '@nestjs/common';
import { TurnoService } from './turno.service';
import { TurnoController } from './turno.controller';
import { Turno } from './entities/turno.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificacionesModule } from 'src/notificaciones/notificaciones.module';
import { Mascota } from 'src/mascotas/entities/mascota.entity';
import { SchedulingService } from 'src/scheduling/scheduling.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Turno, Mascota]),
    forwardRef(() => NotificacionesModule),
  ],
  controllers: [TurnoController],
  providers: [TurnoService, SchedulingService],
})
export class TurnoModule {}
