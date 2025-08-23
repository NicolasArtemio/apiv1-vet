import { Column, OneToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { Pago } from 'src/pago/entities/pago.entity';
import { DetalleVenta } from 'src/detalle_venta/entities/detalle_venta.entity';
import { Empleado } from 'src/empleado/entities/empleado.entity';

@Entity()
export class Venta {
  @PrimaryGeneratedColumn()
  id_compra: number;

  @Column()
  id_cliente: number;

  @Column()
  id_empleado: number;

  @Column('decimal')
  total: number;

  @Column('timestamp')
  fecha: Date;

  @OneToOne(() => Pago, (pago) => pago.venta)
  pago: Pago;

  @OneToMany(() => DetalleVenta, (detalleVenta) => detalleVenta.venta)
  detallesVenta: DetalleVenta[];

  @OneToMany(() => Empleado, (empleado) => empleado.ventas)
  empleado: Empleado;
}
