import { Producto } from '../../productos/entities/producto.entity';
import { Venta } from '../../ventas/entities/venta.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class DetalleVenta {
  @PrimaryGeneratedColumn()
  id_detalle: number;

  @Column()
  id_venta: number;

  @Column()
  id_producto: number;

  @Column()
  cantidad: number;

  @ManyToOne(() => Venta, (venta) => venta.detallesVenta)
  @JoinColumn({ name: 'id_venta' })
  venta: Venta;

  @ManyToOne(() => Producto, (producto) => producto.detallesVenta)
  @JoinColumn({ name: 'id_producto' })
  producto: Producto;
}
