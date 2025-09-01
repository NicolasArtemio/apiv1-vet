import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTurnoDto } from './dto/create-turno.dto';
import { UpdateTurnoDto } from './dto/update-turno.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Turno } from './entities/turno.entity';
import { Mensaje } from 'src/mensaje/entities/mensaje.entity';

@Injectable()
export class TurnoService {
 
  constructor(
     @InjectRepository(Turno)
    private readonly turnoRepository: Repository<Turno>,

  ){}
  async createTurno(createTurnoDto: CreateTurnoDto):Promise<Turno> {
      try{ 
    const turno=this.turnoRepository.create(createTurnoDto)
    return await this.turnoRepository.save(createTurnoDto);
  }  catch(error) {
          throw new Error(`Error al crear turno: ${error.message}`);
     } }

 async findAll():Promise<Turno[]>{
    return await this.turnoRepository.find();
  
  }

  async findOne(id: number):Promise<Turno> {
    const turno= await this.turnoRepository.findOneBy({id});
      if (!turno) {
         throw new NotFoundException(`turno con id ${id} no encontrada`);
       }
       return turno;
 }catch(error){
    throw error;
  }


  async update(id: number, updateTurnoDto: UpdateTurnoDto) {
   const result= await this.turnoRepository.update(id, updateTurnoDto);
     if (result.affected === 0) {
      throw new NotFoundException(`El turno con id ${id} no encontrado`);
     }
       return { message: `El turno con id ${id}  fue actualizado correctamente` };
  }

  async remove(id: number): Promise<{ id: number; message: string }>{
    const result=await this.turnoRepository.softDelete({id});
       if (result.affected === 0) {
    throw new NotFoundException(`Notificación con id ${id} no encontrada`);
  }
 return { id, message: `Notificacion con id ${id}  fue eliminado correctamente` };
}
}
