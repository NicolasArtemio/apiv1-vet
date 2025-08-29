import { Module, forwardRef } from '@nestjs/common';
import { MascotasService } from './mascotas.service';
import { MascotasController } from './mascotas.controller';
import { Mascota } from './entities/mascota.entity';
import { Turno } from 'src/turno/entities/turno.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TurnoService } from 'src/turno/turno.service';
import { ClienteModule } from 'src/cliente/cliente.module';
import { ClienteService } from 'src/cliente/cliente.service';
import { Cliente } from 'src/cliente/entities/cliente.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mascota, Turno, Cliente]),
    forwardRef(() => ClienteModule),
  ],
  controllers: [MascotasController],
  providers: [MascotasService, TurnoService, ClienteService],
})
export class MascotasModule {}
