import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venta } from './entities/venta.entity';
import { UpdateVentaDto } from './dto/update-venta.dto';

@Injectable()
export class VentasService {
  constructor(
    @InjectRepository(Venta)
    private ventaRepository: Repository<Venta>,
  ) {}

  /**
   * Crea una nueva venta.
   * @param createVentaDto - Datos para crear la venta.
   * @returns La venta creada.
   * @throws ConflictException si ya existe una venta con datos duplicados.
   * @throws BadRequestException si los datos referenciados no existen.
   * @throws InternalServerErrorException si ocurre un error interno al crear la venta.
   */
  async create(createVentaDto: CreateVentaDto): Promise<Venta> {
    try {
      const venta = this.ventaRepository.create(createVentaDto);
      return await this.ventaRepository.save(venta);
    } catch (error: unknown) {
      console.error('Error al crear la venta:', error);

      // Type guard para asegurar que el error tiene las propiedades necesarias
      if (typeof error === 'object' && error !== null) {
        const err = error as { code?: string; errno?: number };

        // Entrada duplicada (clave única)
        if (err.code === 'ER_DUP_ENTRY' || err.errno === 1062) {
          throw new ConflictException(
            'Ya existe una venta con datos duplicados',
          );
        }

        // Clave foránea inválida
        if (err.code === 'ER_NO_REFERENCED_ROW_2' || err.errno === 1452) {
          throw new BadRequestException('Datos referenciados no existen');
        }
      }

      throw new InternalServerErrorException('Error interno al crear la venta');
    }
  }

  /**
   * Busca y devuelve todas las ventas.
   * @returns Lista de todas las ventas.
   */
  async findAll(): Promise<Venta[]> {
    return this.ventaRepository.find();
  }

  /**
   * Busca y devuelve una venta por su ID.
   * @param id - ID de la venta a buscar.
   * @returns La venta encontrada.
   * @throws NotFoundException si la venta no es encontrada.
   * @throws InternalServerErrorException si ocurre un error interno al buscar la venta.
   */
  async findOne(id: number): Promise<Venta> {
    if (id <= 0) {
      throw new BadRequestException('El ID debe ser un número positivo');
    }
    try {
      const venta = await this.ventaRepository.findOneBy({ id_compra: id });

      if (!venta) {
        throw new NotFoundException(`Venta con ID ${id} no encontrada`);
      }

      return venta;
    } catch (error) {
      console.error('Error al buscar la venta:', error);
      throw new InternalServerErrorException(
        'Error interno al buscar la venta',
      );
    }
  }

  /**
   * Actualiza una venta existente.
   * @param id - ID de la venta a actualizar.
   * @param updateVentaDto - Datos para actualizar la venta.
   * @returns La venta actualizada.
   * @throws NotFoundException si la venta no es encontrada.
   * @throws InternalServerErrorException si ocurre un error interno al actualizar la venta.
   */
  async update(id: number, updateVentaDto: UpdateVentaDto): Promise<Venta> {
    if (id <= 0) {
      throw new BadRequestException('El ID debe ser un número positivo');
    }
    try {
      const venta = await this.ventaRepository.findOneBy({ id_compra: id });

      if (!venta) {
        throw new NotFoundException(`Venta con ID ${id} no encontrada`);
      }

      Object.assign(venta, updateVentaDto);
      return await this.ventaRepository.save(venta);
    } catch (error) {
      console.error('Error al actualizar la venta:', error);
      throw new InternalServerErrorException(
        'Error interno al actualizar la venta',
      );
    }
  }

  /**
   * Elimina una venta por su ID.
   * @param id - ID de la venta a eliminar.
   * @returns La venta eliminada.
   * @throws BadRequestException si el ID no es un número positivo.
   * @throws NotFoundException si la venta no es encontrada.
   * @throws InternalServerErrorException si ocurre un error interno al eliminar la venta.
   */
  async remove(id: number): Promise<Venta> {
    if (id <= 0) {
      throw new BadRequestException('El ID debe ser un número positivo');
    }

    try {
      const venta = await this.ventaRepository.findOneBy({ id_compra: id });

      if (!venta) {
        throw new NotFoundException(`Venta con ID ${id} no encontrada`);
      }

      await this.ventaRepository.remove(venta);
      return venta;
    } catch (error) {
      console.error('Error al eliminar la venta:', error);
      throw new InternalServerErrorException(
        'Error interno al eliminar la venta',
      );
    }
  }
}
