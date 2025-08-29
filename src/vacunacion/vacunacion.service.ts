import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateVacunacionDto } from './dto/create-vacunacion.dto';
import { UpdateVacunacionDto } from './dto/update-vacunacion.dto';
import { Vacunacion } from './entities/vacunacion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class VacunacionService {
  constructor(
    @InjectRepository(Vacunacion)
    private readonly vacunacionRepository: Repository<Vacunacion>
  ) { }

  async create(createVacunacionDto: CreateVacunacionDto): Promise<Vacunacion> {
    try {
      const nuevaVacunacion = this.vacunacionRepository.create(createVacunacionDto);
      return await this.vacunacionRepository.save(nuevaVacunacion);

    } catch (error) {
      console.error("Error mientras se crea la Vacunacion", error);
      if (typeof error === 'object' && error !== null) {
        const err = error as { code?: string; errno?: number };

        if (err.code === 'ER_DUP_ENTRY' || err.errno === 1062) {
          throw new ConflictException('Ya existe una mascota con datos duplicados');
        }

        if (err.code === 'ER_NO_REFERENCED_ROW_2' || err.errno === 1452) {
          throw new BadRequestException('Datos referenciados no existen');
        }
      }
      throw new InternalServerErrorException("Error al crear mascota");


    }
  }

  async findAll(): Promise<Vacunacion[]> {
    return await this.vacunacionRepository.find();
  }
  
async findOne(id: number): Promise <Vacunacion | null> {
  if (id<= 0){
    throw new BadRequestException ("El id debe ser un numero positivo")
  }
try {
  const vacunacion= await this.vacunacionRepository.findOneBy({ id });
  if (!vacunacion){
    throw new HttpException("Vacunacion no encontrada", HttpStatus.BAD_REQUEST)
  }
  return vacunacion;
} catch (error) {
  console.error("Error al buscar la vacunacion", HttpStatus.BAD_REQUEST)
  throw new HttpException("Vacunacion no encontrada", HttpStatus.BAD_REQUEST);
}

  }

async update(id: number, updateVacunacionDto: UpdateVacunacionDto): Promise<Vacunacion| null> {
    if (id <= 0) {
      throw new BadRequestException('El ID debe ser un número positivo');
    }
    try {
      const vacunacion = await this.vacunacionRepository.findOneBy({ id });
      if (!vacunacion) {
        throw new HttpException("Vacunacion no encontrada", HttpStatus.BAD_REQUEST)
      }
      const updateVacunacion = Object.assign(id, updateVacunacionDto)
      return this.vacunacionRepository.save(updateVacunacion);

    } catch (error) {
      console.error("Error al buscar la Vacunacion", error);
      throw new InternalServerErrorException(`No se encontro la vacunacion con el id ${id}`);
    }

  }


  async remove(id: number): Promise<Vacunacion | null> {
    if (id <= 0) {
      throw new BadRequestException('El ID debe ser un número positivo');
    }

    try {
      const mascota = await this.vacunacionRepository.findOneBy({ id });
      if (!mascota) {
        throw new HttpException("Mascota eliminada", HttpStatus.BAD_REQUEST)
      } return this.vacunacionRepository.remove(mascota);

    } catch (error) {
      console.error("Error al buscar la vacunacion", error);
      throw new InternalServerErrorException(`No se encontro la vacunacion con el id ${id}`);
    }

  }


}