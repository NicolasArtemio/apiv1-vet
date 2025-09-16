import { Cliente } from "../../cliente/entities/cliente.entity";
import { DetalleVenta } from "../../detalle_venta/entities/detalle_venta.entity";
import { Empleado } from "../../empleado/entities/empleado.entity";
import { Pago } from "../../pago/entities/pago.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Venta {
  @PrimaryGeneratedColumn()
  id_compra: number;

  @Column()
  id_cliente: number;

  @Column('timestamp')
  fecha: Date;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  total: number;

  @OneToOne(() => Pago, (pago) => pago.venta)
  pago: Pago;

  @OneToMany(() => DetalleVenta, (detalle) => detalle.venta, { cascade: true })
  detalles: DetalleVenta[];

  @ManyToOne(() => Empleado, (empleado) => empleado.venta)
  @JoinColumn({ name: 'id_empleado' })
  empleado: Empleado;

  @ManyToOne(() => Cliente, (cliente) => cliente.venta)
  @JoinColumn({ name: 'id_cliente' })
  cliente: Cliente;
  detallesVenta: any;
  detalleVenta: any;
}