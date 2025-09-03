import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateDetalleVentaDto } from './dto/create-detalle_venta.dto';
import { UpdateDetalleVentaDto } from './dto/update-detalle_venta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DetalleVenta } from './entities/detalle_venta.entity';
import { Repository } from 'typeorm';
import { Venta } from 'src/ventas/entities/venta.entity';
import { Producto } from 'src/productos/entities/producto.entity';

@Injectable()
export class DetalleVentaService {
  constructor(
    @InjectRepository(DetalleVenta)
    private readonly detalleVentaRepository: Repository<DetalleVenta>,
    @InjectRepository(Venta)
    private readonly ventaRepository: Repository<Venta>,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}
  async create(
    createDetalleVentaDto: CreateDetalleVentaDto,
  ): Promise<DetalleVenta> {
    try {
      const { id_venta, id_producto, ...resto } = createDetalleVentaDto;

      const venta: Venta | null = await this.ventaRepository.findOneBy({
        id_compra: id_venta,
      });
      if (!venta) {
        throw new NotFoundException('Venta no encontrada');
      }

      const producto = await this.productoRepository.findOneBy({
        id: id_producto,
      });
      if (!producto) {
        throw new NotFoundException('Producto no encontrado');
      }

      const detalle = this.detalleVentaRepository.create({
        ...resto,
        venta,
        producto,
      });

      return await this.detalleVentaRepository.save(detalle);
    } catch (error) {
      console.error('Error al crear el pago:', error);

      if (typeof error === 'object' && error !== null) {
        const err = error as { code?: string; errno?: number };

        if (err.code === 'ER_DUP_ENTRY' || err.errno === 1062) {
          throw new ConflictException('Ya existe un pago con datos duplicados');
        }

        if (err.code === 'ER_NO_REFERENCED_ROW_2' || err.errno === 1452) {
          throw new BadRequestException('Datos referenciados no existen');
        }
      }

      throw new InternalServerErrorException('Error interno al crear el pago');
    }
  }

  async findAll(): Promise<DetalleVenta[]> {
    return this.detalleVentaRepository.find();
  }

  async findOne(id: number): Promise<DetalleVenta> {
    try {
      const factura = await this.detalleVentaRepository.findOneBy({
        id_detalle: id,
      });
      if (!factura) {
        throw new NotFoundException('No existe la factura');
      }
      return factura;
    } catch (error) {
      console.error('Error al buscar el detalle de venta:', error);
      throw new InternalServerErrorException(
        'Error interno al buscar el detalle de venta',
      );
    }
  }
  async update(
    id: number,
    updateDetalleVentaDto: UpdateDetalleVentaDto,
  ): Promise<DetalleVenta> {
    const detalleVenta = await this.detalleVentaRepository.findOneBy({
      id_detalle: id,
    });

    if (!detalleVenta) {
      throw new NotFoundException(`DetalleVenta con id ${id} no encontrado`);
    }

    Object.assign(detalleVenta, updateDetalleVentaDto);

    try {
      return await this.detalleVentaRepository.save(detalleVenta);
    } catch (error) {
      console.error('Error al actualizar detalleVenta:', error);
      throw new InternalServerErrorException(
        'Error interno al actualizar el detalleVenta',
      );
    }
  }

  async remove(id: number): Promise<DetalleVenta> {
    try {
      const factura = await this.detalleVentaRepository.findOneBy({
        id_detalle: id,
      });
      if (!factura) {
        throw new NotFoundException('No existe la factura');
      }
      return await this.detalleVentaRepository.remove(factura);
    } catch (error) {
      console.error('Error al elminar detalle de venta:', error);
      throw new InternalServerErrorException(
        'Error interno al eliminar el detalle de venta',
      );
    }
  }
}
