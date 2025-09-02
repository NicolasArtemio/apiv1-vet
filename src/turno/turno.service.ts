import { BadRequestException, ConflictException, ForbiddenException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
        
              console.error('Error mientras se crea el turno', error);
              if (typeof error === 'object' && error !== null) {
                const err = error as { code?: string; errno?: number };
        
                if (err.code === 'ER_DUP_ENTRY' || err.errno === 1062) {
                  throw new ConflictException(
                    'Ya existe el turno con datos duplicados',
                  );
                }
                if (err.code === 'ER_NO_REFERENCED_ROW_2' || err.errno === 1452) {
                  throw new BadRequestException('Datos referenciados no existen');
                }
              }
              throw new InternalServerErrorException('Error al crear turno');
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

async update(id: number,UpdateTurnoDto: UpdateTurnoDto,): Promise<Turno> {
      if (id <= 0) {
      throw new BadRequestException('El ID debe ser un número positivo');
      }
      try {
        const turno = await this.turnoRepository.findOneBy({ id });
        if (!turno) {
          throw new HttpException( 'turno no fue encontrado', HttpStatus.BAD_REQUEST, );
        }
        const updateTurno = Object.assign(turno, UpdateTurnoDto);
        return this.turnoRepository.save(updateTurno);
      } catch (error) {
        console.error('Error al buscar el mensaje', error);
        throw new InternalServerErrorException(
          `No se encontro el turno con el id ${id}`,
        );
      }
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
