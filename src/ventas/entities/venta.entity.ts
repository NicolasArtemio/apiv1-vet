/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { EstadoPagos } from 'src/enums/estado-pagos.enum';
import { TipoPagos } from 'src/enums/tipo-pagos.enum';
import { Cliente } from '../../cliente/entities/cliente.entity';
import { DetalleVenta } from '../../detalle_venta/entities/detalle_venta.entity';
import { Empleado } from '../../empleado/entities/empleado.entity';
import { Pago } from '../../pago/entities/pago.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Venta {
  @PrimaryGeneratedColumn()
  id_compra: number;

  @Column('timestamp')
  fecha: Date;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  total: number;

  @Column({ type: 'enum', enum: TipoPagos })
  metodo_pago: TipoPagos;

  @Column({ type: 'enum', enum: EstadoPagos })
  estado_pago: EstadoPagos;

  @OneToOne(() => Pago, (pago) => pago.venta, { cascade: true })
  @JoinColumn()
  pago: Pago;

  @OneToMany(() => DetalleVenta, (detalle) => detalle.venta, { cascade: true })
  detalles: DetalleVenta[];

  @ManyToOne(() => Empleado, (empleado) => empleado.ventas)
  @JoinColumn({ name: 'id_empleado' })
  empleado: Empleado;

  @ManyToOne(() => Cliente, (cliente) => cliente.ventas)
  @JoinColumn({ name: 'id_cliente' })
  cliente: Cliente;
}

