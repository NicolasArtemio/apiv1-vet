import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMensajeDto } from './dto/create-mensaje.dto';
import { UpdateMensajeDto } from './dto/update-mensaje.dto';
import { Mensaje } from './entities/mensaje.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { promises } from 'dns';



@Injectable()
export class MensajeService {

  constructor(  
  @InjectRepository(Mensaje)
    private readonly mensajeRepository: Repository<Mensaje>,
  )
  {}
  async createMensaje(createMensajeDto: CreateMensajeDto): Promise<Mensaje>{
    try{ 
      const mensaje=this.mensajeRepository.create(createMensajeDto)
      
      return await this.mensajeRepository.save(mensaje);
   
  }catch (error) {
    throw new Error(`Error al crear el mensaje: ${error.message}`);
  }}

 async findAll(): Promise<Mensaje[]> {
    return await this.mensajeRepository.find();
  }

  async findOne(id: number): Promise <Mensaje> {
  try{ 
    const mensaje= await this.mensajeRepository.findOneBy({id});

 if (!mensaje) {
    throw new NotFoundException(`mensaje con id ${id} no encontrada`);
  }
  return mensaje;
  }catch(error){
    throw error;
  }
}
async update(id: number, updateMensajeDto: UpdateMensajeDto) {
  const result = await this.mensajeRepository.update(id, updateMensajeDto);

  if (result.affected === 0) {
    throw new NotFoundException(`Mensaje con id ${id} no encontrado`);
  }

  return { message: `El Mensaje con id ${id} fue actualizado correctamente` };
}


  
async remove(id: number): Promise<{ id: number; message: string }> {
  const result = await this.mensajeRepository.softDelete(id);

  if (result.affected === 0) {
    throw new NotFoundException(`Mensaje con id ${id} no encontrado`);
  }

  return { id, message: `Mensaje con id ${id} eliminado correctamente` };
}
}


