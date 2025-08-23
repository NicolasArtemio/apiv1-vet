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
