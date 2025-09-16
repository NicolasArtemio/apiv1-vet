import { Empleado } from '../../empleado/entities/empleado.entity';
import { Producto } from '../../productos/entities/producto.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Inventario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_producto: number;

  @Column()
  id_empleado: number;

  @Column('timestamp')
  fecha_uso: Date;

  @Column({ type: 'timestamp', nullable: true })
  fecha_devolucion: Date;

  @ManyToOne(() => Producto, (producto) => producto.inventarios)
  @JoinColumn({ name: 'id_producto' })
  producto: Producto;

  @ManyToOne(() => Empleado, (empleado) => empleado.inventarios)
  @JoinColumn({ name: 'id_empleado' })
  empleado: Empleado;
}
