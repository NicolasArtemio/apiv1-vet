import {
  BadRequestException,
  ForbiddenException,
  Injectable,
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
   * Crea una nueva venta en la base de datos.
   * @param createVentaDto - Datos necesarios para crear la venta.
   * @returns La venta creada.
   * @throws BadRequestException si ocurre un error al crear la venta.
   */
  async create(createVentaDto: CreateVentaDto): Promise<Venta> {
    try {
      const venta = this.ventaRepository.create(createVentaDto);
      return await this.ventaRepository.save(venta);
    } catch (error) {
      console.error('Error al crear laventa:', error);
      throw new BadRequestException('Error al crear la venta');
    }
  }

  async findAll(): Promise<Venta[]> {
    return this.ventaRepository.find();
  }

  /**
   * Busca una venta por su ID.
   * @param id - ID de la venta a buscar.
   * @returns La venta encontrada o null si no existe.
   * @throws NotFoundException si la venta no es encontrada.
   * @throws ForbiddenException si ocurre un error al buscar la venta.
   */
  async findOne(id: number): Promise<Venta | null> {
    try {
      const venta = await this.ventaRepository.findOneBy({ id_compra: id });
      {
        if (!venta) {
          throw new NotFoundException('Venta no encontrada');
        } else {
          return venta;
        }
      }
    } catch (error) {
      console.error('Error al buscar la venta:', error);
      throw new ForbiddenException('Error al buscar la venta');
    }
  }

  /**
   * Actualiza una venta existente.
   * @param id - ID de la venta a actualizar.
   * @param updateVentaDto - Datos para actualizar la venta.
   * @returns La venta actualizada.
   * @throws NotFoundException si la venta no es encontrada.
   * @throws ForbiddenException si ocurre un error al actualizar la venta.
   */
  async update(id: number, updateVentaDto: UpdateVentaDto): Promise<Venta> {
    try {
      const venta = await this.ventaRepository.findOneBy({ id_compra: id });
      if (!venta) {
        throw new NotFoundException('Venta no encontrada');
      }
      Object.assign(venta, updateVentaDto);
      return await this.ventaRepository.save(venta);
    } catch (error) {
      console.error('Error al actualizar la venta:', error);
      throw new ForbiddenException('Error al actualizar la venta');
    }
  }

  /**
   * Elimina una venta por su ID.
   * @param id - ID de la venta a eliminar.
   * @returns La venta eliminada.
   * @throws NotFoundException si la venta no es encontrada.
   * @throws ForbiddenException si ocurre un error al eliminar la venta.
   */
  async remove(id: number): Promise<Venta | null> {
    try {
      const venta = await this.ventaRepository.findOneBy({ id_compra: id });
      if (!venta) {
        throw new NotFoundException('Venta no encontrada');
      }
      await this.ventaRepository.remove(venta);
      return venta;
    } catch (error) {
      console.error('Error al eliminar la venta:', error);
      throw new ForbiddenException('Error al eliminar la venta');
    }
  }
}
