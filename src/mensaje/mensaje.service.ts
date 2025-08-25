import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMensajeDto } from './dto/create-mensaje.dto';
import { UpdateMensajeDto } from './dto/update-mensaje.dto';
import { Mensaje } from './entities/mensaje.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';



@Injectable()
export class MensajeService {

  constructor(  
  @InjectRepository(Mensaje)
    private readonly mensajeRepository: Repository<Mensaje>,
  )
  {}
  async create(createMensajeDto: CreateMensajeDto) {
      return await this.mensajeRepository.save(createMensajeDto);
   
  }

  async findAll() {

    return await this.mensajeRepository.find();
  }

  async findOne(id: number) {
   const mensaje= await this.mensajeRepository.findOneBy({id});
 if (!mensaje) {
    throw new NotFoundException(`mensaje con id ${id} no encontrada`);
  }
  return mensaje;
  }

  async update(id: number, updateMensajeDto: UpdateMensajeDto) {
  return await this.mensajeRepository.update(id, updateMensajeDto);
  }

   async remove(id: number) {
    const mensaje= await this.mensajeRepository.softDelete({id});
     if (!mensaje) {
    throw new NotFoundException(`mensaje con id ${id} no encontrada`);
  }

  return await this.mensajeRepository.softDelete({ id });

  }
}


