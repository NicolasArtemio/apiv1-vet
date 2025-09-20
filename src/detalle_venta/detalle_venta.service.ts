import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from 'src/productos/entities/producto.entity';
import { Venta } from 'src/ventas/entities/venta.entity';
import { Repository } from 'typeorm';
import { CreateDetalleVentaDto } from './dto/create-detalle_venta.dto';
import { UpdateDetalleVentaDto } from './dto/update-detalle_venta.dto';
import { DetalleVenta } from './entities/detalle_venta.entity';

@Injectable()
export class DetalleVentaService {
  constructor(
    @InjectRepository(DetalleVenta)
    private readonly detalleVentaRepository: Repository<DetalleVenta>,

    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  async create(
    createDetalleVentaDto: CreateDetalleVentaDto,
    venta: Venta,
  ): Promise<DetalleVenta> {
    try {
      // Buscar producto
      const producto = await this.productoRepository.findOneBy({
        id: createDetalleVentaDto.id_producto,
      });
      if (!producto) {
        throw new NotFoundException(
          `Producto con id ${createDetalleVentaDto.id_producto} no encontrado`,
        );
      }

      // Crear detalle
      const nuevoDetalle = this.detalleVentaRepository.create({
        producto,
        cantidad: createDetalleVentaDto.cantidad,
        precio: producto.precio, // toma el precio del producto
        subtotal: producto.precio * createDetalleVentaDto.cantidad,
        venta,
      });

      // Guardar
      return await this.detalleVentaRepository.save(nuevoDetalle);
    } catch (error) {
      console.error('Error creando detalle de venta:', error);

      if (typeof error === 'object' && error !== null) {
        const err = error as { code?: string; errno?: number };

        if (err.code === 'ER_DUP_ENTRY' || err.errno === 1062) {
          throw new ConflictException(
            'Ya existe un detalle de ventas con datos duplicados',
          );
        }
        if (err.code === 'ER_NO_REFERENCED_ROW_2' || err.errno === 1452) {
          throw new BadRequestException('Datos referenciados no existen');
        }
      }

      throw new InternalServerErrorException('Error al crear detalle de venta');
    }
  }

  async findAll(): Promise<DetalleVenta[]> {
    return this.detalleVentaRepository.find();
  }

<<<<<<< HEAD
  async findOne(id: number): Promise<DetalleVenta | null> {
    try {
      const DetalleVenta = await this.detalleVentaRepository.findOneBy({
        id_detalle: id,
      });
      if (!DetalleVenta) {
        throw new NotFoundException('Detalle Venta no encontrado');
      }
      return DetalleVenta;
    } catch (error) {
      console.error('Error al buscar el Detalle Venta:', error);
      throw new BadRequestException('Error al buscar el Detalle Venta');
=======


@Injectable()
export class DetalleVentaService {
    constructor(
      @InjectRepository(DetalleVenta)
      private readonly detalleVentaRepository: Repository<DetalleVenta>
    ) { }

  async create(CreateDetalleVentaDto: CreateDetalleVentaDto): Promise<DetalleVenta> {
      try {
  
         const nuevoDetalleVenta= this.detalleVentaRepository.create({
                ...CreateDetalleVentaDto ,
                
              });
  
        return await this.detalleVentaRepository.save( nuevoDetalleVenta);
      } catch (error) {
  
        console.error('Error mientras se crea el detalle de ventas', error);
        if (typeof error === 'object' && error !== null) {
          const err = error as { code?: string; errno?: number };
  
          if (err.code === 'ER_DUP_ENTRY' || err.errno === 1062) {
            throw new ConflictException(
              'Ya existe un detalle de ventas con datos duplicados',
            );
          }
          if (err.code === 'ER_NO_REFERENCED_ROW_2' || err.errno === 1452) {
            throw new BadRequestException('Datos referenciados no existen');
          }
        }
        throw new InternalServerErrorException('Error al creardetalle de ventas');
      }
  
    }

 async findAll():Promise<DetalleVenta[]> {
  return this.detalleVentaRepository.find();
=======
  async findOne(id: number): Promise<DetalleVenta> {
    const detalleVenta = await this.detalleVentaRepository.findOneBy({
      id_detalle: id,
    });
    if (!detalleVenta)
      throw new NotFoundException('Detalle Venta no encontrado');
    return detalleVenta;
>>>>>>> 2ac244bdabf6bedb32c8e04ebfaff7db5238df69
  }

async findOne(id_detalle : number): Promise< DetalleVenta| null> {
       try{
         const DetalleVenta= await this.detalleVentaRepository.findOneBy({ id_detalle });
         if (!DetalleVenta) {
           throw new NotFoundException('Detalle Venta no encontrado');
         }
         return DetalleVenta;
       } catch (error) {
         console.error('Error al buscar el Detalle Venta:', error);
         throw new BadRequestException('Error al buscar el Detalle Venta');
       }
  }

  async update(id_detalle , updateDetalleVentaDto: UpdateDetalleVentaDto):Promise<DetalleVenta| null>{
 try{
      const detalleVenta = await this.detalleVentaRepository.findOneBy({ id_detalle });
      if (!detalleVenta) {
        throw new NotFoundException('detalles de ventas no fue encontrado');
      }
      this.detalleVentaRepository.merge(detalleVenta, updateDetalleVentaDto);
      return await this.detalleVentaRepository.save(detalleVenta);
    } catch (error) {
      console.error('Error al actualizar el detalles de ventas:', error);
      throw new BadRequestException('Error al actualizar el detalle de ventas');
>>>>>>> 10824e497bd527dd0c8ab682cda9340915e06a3e
    }
  }
  

<<<<<<< HEAD
  async update(
    id: number,
    updateDetalleVentaDto: UpdateDetalleVentaDto,
  ): Promise<DetalleVenta> {
    const detalleVenta = await this.detalleVentaRepository.findOneBy({
      id_detalle: id,
    });
    if (!detalleVenta)
      throw new NotFoundException('Detalle de venta no encontrado');

    this.detalleVentaRepository.merge(detalleVenta, updateDetalleVentaDto);
    return await this.detalleVentaRepository.save(detalleVenta);
  }

  async remove(id: number): Promise<DetalleVenta> {
    const detalleVenta = await this.detalleVentaRepository.findOneBy({
      id_detalle: id,
    });
    if (!detalleVenta)
      throw new NotFoundException('Detalle de venta no encontrado');

    await this.detalleVentaRepository.remove(detalleVenta);
    return detalleVenta;
  }
}
=======
  async remove(id_detalle: number): Promise<DetalleVenta | null> {
          try {
        const detalleVenta = await this.detalleVentaRepository.findOneBy({ id_detalle });
        if (!detalleVenta) {
          throw new NotFoundException('detalle de venta no fue encontrado');
        }
        await this.detalleVentaRepository.remove(detalleVenta);
        return detalleVenta;
      } catch (error) {
        console.error('Error al eliminar el detalle de ventas:', error);
        throw new BadRequestException('Error al eliminar el detalle');
      }
    }
  }
  
>>>>>>> 10824e497bd527dd0c8ab682cda9340915e06a3e
