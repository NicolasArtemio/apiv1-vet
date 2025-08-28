import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificacioneDto } from './dto/create-notificacione.dto';
import { UpdateNotificacioneDto } from './dto/update-notificacione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Notificacion } from './entities/notificacione.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificacionesService {
  constructor(
  @InjectRepository(Notificacion)
  private readonly notificacionesRepository: Repository<Notificacion>,
)
  {}
   async create(createNotificacioneDto: CreateNotificacioneDto) {
    return await this.notificacionesRepository.save(createNotificacioneDto);
  }

  async findAll() {
    return await this.notificacionesRepository.find();
    
  }

  async findOne(id: number) {
    const notificacion = await this.notificacionesRepository.findOneBy({ id });
  if (!notificacion) {
    throw new NotFoundException(`Notificación con id ${id} no encontrada`);
  }
  return notificacion;
}
  

  async update(id: number, updateNotificacioneDto: UpdateNotificacioneDto) {
    return await this.notificacionesRepository.update(id, updateNotificacioneDto);
  }

  async remove(id: number) {
    const notificacion=await this.notificacionesRepository.softDelete({id});
     if (!notificacion) {
    throw new NotFoundException(`Notificación con id ${id} no encontrada`);
  }

  return await this.notificacionesRepository.softDelete({ id });
}
  }

