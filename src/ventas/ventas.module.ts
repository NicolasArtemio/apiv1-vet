import { Module } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { VentasController } from './ventas.controller';
import { Venta } from './entities/venta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empleado } from '../empleado/entities/empleado.entity';
import { Cliente } from '../cliente/entities/cliente.entity';
import { DetalleVenta } from '../detalle_venta/entities/detalle_venta.entity';
import { Producto } from 'src/productos/entities/producto.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Venta,
      Empleado,
      Cliente,
      DetalleVenta,
      Producto,
    ]),
  ],
  controllers: [VentasController],
  providers: [VentasService],
  exports: [VentasService],
})
export class VentasModule {}
