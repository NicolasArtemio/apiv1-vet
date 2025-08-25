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
  async create(createTurnoDto: CreateTurnoDto) {
    return await this.turnoRepository.save(createTurnoDto)
  }

 async findAll() {
    return await this.turnoRepository.find();
  
  }

  async findOne(id: number) {
    const turno= await this.turnoRepository.findOneBy({id});
      if (!turno) {
         throw new NotFoundException(`turno con id ${id} no encontrada`);
       }
       return turno;;
  }

  async update(id: number, updateTurnoDto: UpdateTurnoDto) {
    return await this.turnoRepository.update(id, updateTurnoDto);
  }

  async remove(id: number) {
    const turno=await this.turnoRepository.softDelete({id});
     if (!turno) {
    throw new NotFoundException(`turno con id ${id} no encontrada`);
  }

  return await this.turnoRepository.softDelete({ id });

  }
}
