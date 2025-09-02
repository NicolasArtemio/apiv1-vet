import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';
import { Inventario } from './entities/inventario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class InventarioService {
  constructor(
    @InjectRepository(Inventario)
    private readonly inventarioRepository: Repository<Inventario>,
  ) {}
async create(createInventarioDto: CreateInventarioDto): Promise<Inventario> {
  try {
    const nuevoInventario = this.inventarioRepository.create({
      ...createInventarioDto,
      empleado: { id: createInventarioDto.id_empleado },
    });

    return await this.inventarioRepository.save(nuevoInventario);
  } catch (error) {
    console.error('Error al crear el inventario ', error);

    if (typeof error === 'object' && error !== null) {
      const err = error as { code?: string; errno?: number };

      if (err.code === 'ER_DUP_ENTRY' || err.errno === 1062) {
        throw new ConflictException(
          'Ya existe un inventario con datos duplicados',
        );
      }

      if (err.code === 'ER_NO_REFERENCED_ROW_2' || err.errno === 1452) {
        throw new BadRequestException('Datos referenciados no existen');
      }
    }

    throw new InternalServerErrorException(
      'Error interno al crear el inventario',
    );
  }
}


  async findAll(): Promise<Inventario[]> {
    return await this.inventarioRepository.find();
  }

  async findOne(id: number): Promise<Inventario | null> {
    if (id <= 0) {
      throw new BadRequestException('El id debe ser positivo');
    }
    try {
      const item = await this.inventarioRepository.findOneBy({ id });

      if (!item) {
        throw new NotFoundException(
          `No se encontro inventario con el id ${id}`,
        );
      }

      return await this.inventarioRepository.findOneBy({ id });
    } catch (error) {
      console.error('', error);
      throw new InternalServerErrorException(
        'error interno al crear inventario',
      );
    }
  }

  async update(
    id: number,
    updateInventarioDto: UpdateInventarioDto,
  ): Promise<Inventario | null> {
    if (id <= 0) {
      throw new BadRequestException('El id debe ser positivo');
    }
    try {
      const item = await this.inventarioRepository.findOneBy({ id });

      if (!item) {
        throw new NotFoundException(
          `No se encontro inventario con el id ${id}`,
        );
      }

      const updateItem = Object.assign(item, updateInventarioDto);

      return await this.inventarioRepository.save(updateItem);
    } catch (error) {
      console.error('Error al actualizar', error);
      throw new InternalServerErrorException(
        'error interno al actualizar inventario',
      );
    }
  }

  async remove(id: number): Promise<Inventario | null> {
    if (id <= 0) {
      throw new BadRequestException('El id debe ser positivo');
    }
    try {
      const item = await this.inventarioRepository.findOneBy({ id });

      if (!item) {
        throw new NotFoundException(
          `No se encontro inventario con el id ${id}`,
        );
      }

      return await this.inventarioRepository.remove(item);
    } catch (error) {
      console.error('', error);
      throw new InternalServerErrorException(
        'error interno al borrar inventario',
      );
    }
  }
}
