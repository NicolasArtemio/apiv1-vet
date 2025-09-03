import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';
import { Inventario } from './entities/inventario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from 'src/productos/entities/producto.entity';
import { Empleado } from 'src/empleado/entities/empleado.entity';

@Injectable()
export class InventarioService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,

    @InjectRepository(Empleado)
    private readonly empleadoRepository: Repository<Empleado>,

    @InjectRepository(Inventario)
    private readonly inventarioRepository: Repository<Inventario>,
  ) {}
  async create(createInventarioDto: CreateInventarioDto): Promise<Inventario> {
    try {
      const producto = await this.productoRepository.findOneBy({
        id: createInventarioDto.id_producto,
      });
      if (!producto) {
        throw new BadRequestException('Producto no encontrado');
      }

      const empleado = await this.empleadoRepository.findOneBy({
        id: createInventarioDto.id_empleado,
      });
      if (!empleado) {
        throw new BadRequestException('Empleado no encontrado');
      }

      const nuevoInventario = this.inventarioRepository.create({
        producto,
        empleado,
        fecha_uso: createInventarioDto.fecha_uso,
        fecha_devolucion: createInventarioDto.fecha_devolucion,
      });

      return await this.inventarioRepository.save(nuevoInventario);
    } catch (error) {
      console.error('Error al crear el inventario ', error);

      // Type guard para asegurar que el error tiene las propiedades necesarias
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
  async findOne(id: number): Promise<Inventario> {
    if (id <= 0) {
      throw new BadRequestException('El id debe ser positivo');
    }

    try {
      const item = await this.inventarioRepository.findOne({
        where: { id },
        relations: ['producto', 'empleado'],
      });

      if (!item) {
        throw new NotFoundException(
          `No se encontró inventario con el id ${id}`,
        );
      }

      return item;
    } catch (error) {
      console.error('Error al buscar inventario por ID', error);
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Error interno al buscar inventario',
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
