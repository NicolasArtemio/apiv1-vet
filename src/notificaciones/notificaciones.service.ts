import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificacioneDto } from './dto/create-notificacione.dto';
import { UpdateNotificacioneDto } from './dto/update-notificacione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Notificacion } from './entities/notificacione.entity';
import { Repository } from 'typeorm';
import { error } from 'console';

@Injectable()
export class NotificacionesService {
  constructor(
  @InjectRepository(Notificacion)
  private readonly notificacionesRepository: Repository<Notificacion>,
)
  {}
   async createNotificacion(createNotificacioneDto: CreateNotificacioneDto): Promise<Notificacion> {
     try{ 
      const notificacion=this.notificacionesRepository.create(createNotificacioneDto)
    return await this.notificacionesRepository.save(createNotificacioneDto);
     }catch(error) {
          throw new Error(`Error al crear notificacion: ${error.message}`);
     } }

  async findAll():Promise <Notificacion[]> {
    return await this.notificacionesRepository.find();
    
  }

  async findOne(id: number):Promise<Notificacion> {
    try{
    const notificacion = await this.notificacionesRepository.findOneBy({ id });
  if (!notificacion) {
    throw new NotFoundException(`Notificación con id ${id} no encontrada`);
  }
  return notificacion;
}catch(error){
    throw error;
  }
}
  

  async update(id: number, updateNotificacioneDto: UpdateNotificacioneDto) {
    const result= await this.notificacionesRepository.update(id, updateNotificacioneDto);
     if (result.affected === 0) {
      throw new NotFoundException(`la notificacion con id ${id} no encontrado`);
     }
       return { message: `La notificacion con id ${id}  fue actualizado correctamente` };
  }

  async remove(id: number): Promise<{ id: number; message: string }>{
    const result=await this.notificacionesRepository.softDelete({id});

     if (result.affected === 0) {
    throw new NotFoundException(`Notificación con id ${id} no encontrada`);
  }
 return { id, message: `Notificacion con id ${id}  fue eliminado correctamente` };
}
  }

