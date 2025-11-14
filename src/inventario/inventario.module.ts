import { forwardRef, Module } from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { InventarioController } from './inventario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventario } from './entities/inventario.entity';
import { Producto } from '../productos/entities/producto.entity';
import { Empleado } from '../empleado/entities/empleado.entity';
import { ProductosModule } from 'src/productos/productos.module';
import { EmpleadoModule } from 'src/empleado/empleado.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Inventario, Producto, Empleado]),
    forwardRef(() => ProductosModule),
    forwardRef(() => EmpleadoModule),
  ],
  controllers: [InventarioController],
  providers: [InventarioService],
})
export class InventarioModule {}
