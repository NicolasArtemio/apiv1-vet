/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Venta } from '../../ventas/entities/venta.entity';
import { EstadoPagos } from 'src/enums/estado-pagos.enum';
import { TipoPagos } from 'src/enums/tipo-pagos.enum';

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

  @ManyToOne(() => Venta, (venta) => venta.pago, { eager: true })
  @JoinColumn({ name: 'id_venta' })
  venta: Venta;
}

