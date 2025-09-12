import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Mensaje } from 'src/mensaje/entities/mensaje.entity';
import { MensajeService } from 'src/mensaje/mensaje.service';
import { NotificacionesService } from 'src/notificaciones/notificaciones.service';
import { Notificacion } from 'src/notificaciones/entities/notificacione.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Mensaje, Notificacion])],
  controllers: [UsuarioController],
  providers: [UsuarioService, MensajeService, NotificacionesService],
  exports: [TypeOrmModule, UsuarioService],
})
export class UsuarioModule {}
