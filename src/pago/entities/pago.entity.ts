/* eslint-disable @typescript-eslint/no-unsafe-return */
import { EstadoPagos } from '../../enums/EstadoPagos.enum';
import { TipoPagos } from '../../enums/TipoPagos.enum';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Venta } from '../../ventas/entities/venta.entity';

@Entity()
export class Pago {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('timestamp')
  fecha_pago: Date;

  @Column('decimal')
  monto_pago: number;

  @Column('enum', { enum: TipoPagos })
  metodo_pago: TipoPagos;

  @Column('enum', { enum: EstadoPagos })
  estado_pago: EstadoPagos;

  @ManyToOne(() => Venta, venta => venta.pago, { eager: true })
  @JoinColumn({ name: 'id_venta' })
  venta: Venta;
}