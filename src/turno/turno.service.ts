import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateTurnoDto } from './dto/create-turno.dto';
import { UpdateTurnoDto } from './dto/update-turno.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Turno } from './entities/turno.entity';

@Injectable()
export class TurnoService {
  constructor(
    @InjectRepository(Turno)
    private readonly turnoRepository: Repository<Turno>,
  ) {}

  async create(createTurnoDto: CreateTurnoDto): Promise<Turno> {
    const turno = this.turnoRepository.create(createTurnoDto);
    try {
      return await this.turnoRepository.save(turno);
    } catch (error) {
      console.error('Error al crear el turno', error);
      throw new InternalServerErrorException(
        'Error al crear el turno. Por favor, inténtelo de nuevo más tarde.',
      );
    }
  }
  async findAll(): Promise<Turno[]> {
    return await this.turnoRepository.find();
  }

  async findOne(id_turno: number): Promise<Turno> {
    if (id_turno <= 0) {
      throw new BadRequestException('El ID debe ser un número positivo');
    }
    try {
      const turno = await this.turnoRepository.findOneBy({ id_turno });
      if (!turno) {
        throw new HttpException(
          'el turno no fue encontrado',
          HttpStatus.NOT_FOUND,
        );
      }
      return turno;
    } catch (error) {
      console.error('Error al buscar el turno', error);
      throw new InternalServerErrorException(
        `No se encontro el turno con el id ${id_turno}`,
      );
    }
  }

  async update(
    id_turno: number,
    UpdateTurnoDto: UpdateTurnoDto,
  ): Promise<Turno> {
    if (id_turno <= 0) {
      throw new BadRequestException('El ID debe ser un número positivo');
    }
    try {
      const turno = await this.turnoRepository.findOneBy({ id_turno });
      if (!turno) {
        throw new HttpException(
          'turno no fue encontrado',
          HttpStatus.BAD_REQUEST,
        );
      }
      const updateTurno = Object.assign(turno, UpdateTurnoDto);
      return this.turnoRepository.save(updateTurno);
    } catch (error) {
      console.error('Error al buscar el mensaje', error);
      throw new InternalServerErrorException(
        `No se encontro el turno con el id ${id_turno}`,
      );
    }
  }

  async remove(id_turno: number): Promise<Turno | null> {
    if (id_turno <= 0) {
      throw new BadRequestException('El ID debe ser un número positivo');
    }
    try {
      const turno = await this.turnoRepository.findOneBy({ id_turno });
      if (!turno) {
        throw new HttpException(
          'El turno no encontrado',
          HttpStatus.BAD_REQUEST,
        );
      }
      return this.turnoRepository.remove(turno);
    } catch (error) {
      console.error('Error al buscar el turno', error);
      throw new InternalServerErrorException(
        `No se encontro el turno con el id ${id_turno}`,
      );
    }
  }
}
