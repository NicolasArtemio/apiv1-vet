import { BadRequestException, ForbiddenException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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

  ) { }
  async createTurno(createTurnoDto: CreateTurnoDto): Promise<Turno> {
    try {
      const turno = this.turnoRepository.create(createTurnoDto)
      return await this.turnoRepository.save(turno);
    } catch (error) {
      throw new Error(`Error al crear turno: ${error.message}`);
    }
  }

  async findAll(): Promise<Turno[]> {
    return await this.turnoRepository.find();

  }

  async findOne(id: number): Promise<Turno> {
   if (id <= 0) {
      throw new BadRequestException('El ID debe ser un número positivo');
    }
    try {
      const turno = await this.turnoRepository.findOneBy({ id });
      if (!turno) {
        throw new HttpException('el turno no fue encontrado', HttpStatus.NOT_FOUND);
      }
      return turno;
    } catch (error) {
      throw new InternalServerErrorException(`No se encontro el turno con el id ${id}`,);
    }
  }

  async update(id: number, updateTurnoDto: UpdateTurnoDto) {
    const result = await this.turnoRepository.update(id, updateTurnoDto);
    if (result.affected === 0) {
      throw new NotFoundException(`El turno con id ${id} no encontrado`);
    }
    return { message: `El turno con id ${id}  fue actualizado correctamente` };
  }

  async remove(id: number): Promise<Turno | null> {
    if (id <= 0) {
      throw new BadRequestException('El ID debe ser un número positivo');
    }
    try {
      const turno = await this.turnoRepository.findOneBy({ id });
      if (!turno) {
        throw new HttpException('El turno no encontrado', HttpStatus.BAD_REQUEST,);
      }
      return this.turnoRepository.remove(turno);
    } catch (error) {
      throw new InternalServerErrorException(`No se encontro el turno con el id ${id}`);
    }
  }
}
