import { Module } from '@nestjs/common';
import { MascotasService } from './mascotas.service';
import { MascotasController } from './mascotas.controller';
import { Mascota } from './entities/mascota.entity';
import { Turno } from 'src/turno/entities/turno.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TurnoService } from 'src/turno/turno.service';

@Module({
  imports: [TypeOrmModule.forFeature([Mascota, Turno])],
  controllers: [MascotasController],
  providers: [MascotasService, TurnoService],
})
export class MascotasModule { }
