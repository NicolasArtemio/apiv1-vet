import { forwardRef, Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { Producto } from './entities/producto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpleadoModule } from 'src/empleado/empleado.module';

@Module({
  imports: [
  TypeOrmModule.forFeature([Producto]),
  forwardRef(() => EmpleadoModule),
],
  controllers: [ProductosController],
  providers: [ProductosService],
})
export class ProductosModule {}
