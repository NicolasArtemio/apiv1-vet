import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDetalleVentaDto } from './dto/create-detalle_venta.dto';
import { UpdateDetalleVentaDto } from './dto/update-detalle_venta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetalleVenta } from './entities/detalle_venta.entity';
import { promises } from 'dns';

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
    }
  }
  

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
  
