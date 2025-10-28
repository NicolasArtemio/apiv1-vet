import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Mensaje } from '../mensaje/entities/mensaje.entity';
import { MensajeService } from '../mensaje/mensaje.service';
import { NotificacionesService } from '../notificaciones/notificaciones.service';
import { Notificacion } from '../notificaciones/entities/notificacione.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Mensaje, Notificacion])],
  controllers: [UsuarioController],
  providers: [UsuarioService, MensajeService, NotificacionesService],
  exports: [TypeOrmModule, UsuarioService],
})
export class UsuarioModule {}
