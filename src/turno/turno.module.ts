import { forwardRef, Module } from '@nestjs/common';
import { TurnoService } from './turno.service';
import { TurnoController } from './turno.controller';
import { Turno } from './entities/turno.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificacionesModule } from 'src/notificaciones/notificaciones.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Turno]),
    forwardRef(() => NotificacionesModule),
  ],
  controllers: [TurnoController],
  providers: [TurnoService],
})
export class TurnoModule {}
