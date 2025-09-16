import { EstadoPagos } from '../../enums/EstadoPagos.enum';
import { TipoPagos } from '../../enums/TipoPagos.enum';
import { Entity, Column, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { JoinColumn } from 'typeorm/decorator/relations/JoinColumn';
import { Venta } from '../../ventas/entities/venta.entity';

@Entity()
export class Pago {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_venta: number;

  @Column('timestamp')
  fecha_pago: Date;

  @Column('decimal')
  monto_pago: number;

  @Column('enum', { enum: TipoPagos })
  metodo_pago: TipoPagos;

  @Column('enum', { enum: EstadoPagos })
  estado_pago: EstadoPagos;

  @OneToOne(() => Venta, (venta) => venta.pago)
  @JoinColumn({ name: 'id_venta' })
  venta: Venta;
}
