/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateMascotasDto } from './dto/create-mascotas.dto';
import { UpdateMascotasDto } from './dto/update-mascotas.dto';
import { Mascota } from './entities/mascota.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from 'src/cliente/entities/cliente.entity';

@Injectable()
export class MascotasService {
  constructor(
    @InjectRepository(Mascota)
    private readonly mascotaRepository: Repository<Mascota>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async create(createMascotaDto: CreateMascotasDto): Promise<Mascota> {
    try {
      const cliente = await this.clienteRepository.findOneBy({
        id: createMascotaDto.cliente_id,
      });

      if (!cliente) {
        throw new NotFoundException('Cliente no encontrado');
      }
      const { cliente_id, ...restoDatos } = createMascotaDto;

      const nuevaMascota = this.mascotaRepository.create({
        ...restoDatos,
        cliente, // asigna el objeto cliente aquí
      });

      return await this.mascotaRepository.save(nuevaMascota);
    } catch (error) {
      console.error('Error mientras se crea la mascota', error);
      if (typeof error === 'object' && error !== null) {
        const err = error as { code?: string; errno?: number };

        if (err.code === 'ER_DUP_ENTRY' || err.errno === 1062) {
          throw new ConflictException(
            'Ya existe una mascota con datos duplicados',
          );
        }

        if (err.code === 'ER_NO_REFERENCED_ROW_2' || err.errno === 1452) {
          throw new BadRequestException('Datos referenciados no existen');
        }
      }
      throw new InternalServerErrorException('Error al crear mascota');
    }
  }

  async findAll(): Promise<Mascota[]> {
    return await this.mascotaRepository.find();
  }

  async findOne(id: number): Promise<Mascota | null> {
    if (id <= 0) {
      throw new BadRequestException('El ID debe ser un número positivo');
    }
    try {
      const mascota = await this.mascotaRepository.findOne({
        where: { id },
        relations: ['cliente'],
      });
      if (!mascota) {
        throw new HttpException(
          'Mascota no encontrada',
          HttpStatus.BAD_REQUEST,
        );
      }
      return mascota;
    } catch (error) {
      console.error('Error al buscar la mascota', error);
      throw new InternalServerErrorException(
        `No se encontro la mascota con el id ${id}`,
      );
    }
  }
  async update(
    id: number,
    updateMascotaDto: UpdateMascotasDto,
  ): Promise<Mascota> {
    if (id <= 0) {
      throw new BadRequestException('El ID debe ser un número positivo');
    }

    const mascota = await this.mascotaRepository.findOneBy({ id });

    if (!mascota) {
      throw new NotFoundException(`Mascota no encontrada con id ${id}`);
    }

    Object.assign(mascota, updateMascotaDto);

    return this.mascotaRepository.save(mascota);
  }
  async remove(id: number): Promise<Mascota | null> {
    if (id <= 0) {
      throw new BadRequestException('El ID debe ser un número positivo');
    }

    try {
      const mascota = await this.mascotaRepository.findOneBy({ id });
      if (!mascota) {
        throw new HttpException('Mascota eliminada', HttpStatus.BAD_REQUEST);
      }
      return this.mascotaRepository.remove(mascota);
    } catch (error) {
      console.error('Error al buscar la mascota', error);
      throw new InternalServerErrorException(
        `No se encontro la mascota con el id ${id}`,
      );
    }
  }
}
