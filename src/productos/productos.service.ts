/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productosRepository: Repository<Producto>
  ) { }

  async create(createProductoDto: CreateProductoDto) {
    try {
      const producto = this.productosRepository.create(createProductoDto)

      return await this.productosRepository.save(producto);
    } catch (error) {

      console.error('Error mientras se crea el producto', error);
      if (typeof error === 'object' && error !== null) {
        const err = error as { code?: string; errno?: number };

        if (err.code === 'ER_DUP_ENTRY' || err.errno === 1062) {
          throw new ConflictException(
            'Ya existe un producto con datos duplicados',
          );
        }
        if (err.code === 'ER_NO_REFERENCED_ROW_2' || err.errno === 1452) {
          throw new BadRequestException('Datos referenciados no existen');
        }
      }
      throw new InternalServerErrorException('Error al crear producto');
    }

  }


  findAll(): Promise<Producto[]> {
    return this.productosRepository.find();
  }

  async findOne(id: number): Promise<Producto | null> {
       try{
         const producto = await this.productosRepository.findOneBy({ id });
         if (!producto) {
           throw new NotFoundException('producto no encontrado');
         }
         return producto;
       } catch (error) {
         console.error('Error al buscar el producto:', error);
         throw new BadRequestException('Error al buscar el producto');
       }
  }

  async update(id: number, updateProductoDto: UpdateProductoDto): Promise<Producto | null> {
      try{
      const producto = await this.productosRepository.findOneBy({ id });
      if (!producto) {
        throw new NotFoundException('producto no encontrado');
      }
      this.productosRepository.merge(producto, updateProductoDto);
      return await this.productosRepository.save(producto);
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      throw new BadRequestException('Error al actualizar el producto');
    }
  }

  async remove(id: number): Promise<Producto | null> {
        try {
      const producto = await this.productosRepository.findOneBy({ id });
      if (!producto) {
        throw new NotFoundException('producto no encontrado');
      }
      await this.productosRepository.remove(producto);
      return producto;
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      throw new BadRequestException('Error al eliminar el producto');
    }
  }
}
