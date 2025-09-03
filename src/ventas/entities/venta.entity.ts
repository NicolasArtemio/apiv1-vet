import {
  Column,
  OneToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { Pago } from 'src/pago/entities/pago.entity';
import { DetalleVenta } from 'src/detalle_venta/entities/detalle_venta.entity';
import { Empleado } from 'src/empleado/entities/empleado.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';

@Entity()
export class Venta {
  @PrimaryGeneratedColumn()
  id_compra: number;

  @Column()
  id_cliente: number;

  @Column({ nullable: true })
  id_empleado: number;

  @Column()
  total: number;

  @Column('timestamp')
  fecha: Date;

  @OneToOne(() => Pago, (pago) => pago.venta)
  pago: Pago;

  @OneToMany(() => DetalleVenta, (detalleVenta) => detalleVenta.venta)
  detallesVenta: DetalleVenta[];

  @ManyToOne(() => Empleado, (empleado) => empleado.venta)
  @JoinColumn({ name: 'id_empleado' })
  empleado: Empleado;
  @ManyToOne(() => Cliente, (cliente) => cliente.ventas)
  @JoinColumn({ name: 'id_cliente' })
  cliente: Cliente;
}
