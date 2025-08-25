/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Repository } from 'typeorm';
import { Mensaje } from 'src/mensaje/entities/mensaje.entity';
import { Usuario } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Notificacion } from 'src/notificaciones/entities/notificacione.entity';

@Injectable()
export class UsuarioService {
<<<<<<< HEAD
  create(CreateUsuarioDto: CreateUsuarioDto) {
=======
  constructor( 
      @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
     //   @InjectRepository(Mensaje)
     //   private readonly mensajeRepository: Repository<Mensaje>,
       // @InjectRepository(Notificacion)
        //private readonly notificacionesRepository: Repository<Notificacion>,
      ){
      
  }
  create(createUsuarioDto: CreateUsuarioDto) {
>>>>>>> marina
    return 'This action adds a new usuario';
  }

  findAll() {
    return `This action returns all usuario`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, UpdateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
