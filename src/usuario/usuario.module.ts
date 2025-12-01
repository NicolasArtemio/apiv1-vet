import { forwardRef, Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Mensaje } from '../mensaje/entities/mensaje.entity';
import { MensajeService } from '../mensaje/mensaje.service';
import { NotificacionesService } from '../notificaciones/notificaciones.service';
import { Notificacion } from '../notificaciones/entities/notificacione.entity';
import { EmpleadoModule } from '../empleado/empleado.module';
import { NotificacionesModule } from 'src/notificaciones/notificaciones.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, Mensaje, Notificacion]),
    forwardRef(() => EmpleadoModule),
    NotificacionesModule,
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService, MensajeService, NotificacionesService],
  exports: [TypeOrmModule, UsuarioService],
})
export class UsuarioModule {}
