import { Module, forwardRef } from '@nestjs/common';
import { MascotasService } from './mascotas.service';
import { MascotasController } from './mascotas.controller';
import { Mascota } from './entities/mascota.entity';
import { Turno } from '../turno/entities/turno.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TurnoService } from '../turno/turno.service';
import { ClienteModule } from '../cliente/cliente.module';
import { ClienteService } from '../cliente/cliente.service';
import { Cliente } from '../cliente/entities/cliente.entity';
import { UsuarioModule } from '../usuario/usuario.module';
import { NotificacionesModule } from '../notificaciones/notificaciones.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mascota, Turno, Cliente]),
    forwardRef(() => ClienteModule),
    UsuarioModule,
    NotificacionesModule,
  ],
  controllers: [MascotasController],
  providers: [MascotasService, TurnoService, ClienteService],
})
export class MascotasModule {}
