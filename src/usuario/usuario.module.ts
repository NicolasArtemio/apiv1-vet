import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Mensaje } from 'src/mensaje/entities/mensaje.entity';
import { MensajeService } from 'src/mensaje/mensaje.service';
import { NotificacionesService } from 'src/notificaciones/notificaciones.service';


@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Mensaje, Notification])],
  controllers: [UsuarioController],
  providers: [UsuarioService, MensajeService, NotificacionesService],
 
})
export class UsuarioModule {}
