import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column('enum', { enum: ['Efectivo', 'Tarjeta', 'Transferencia'] })
  metodo_pago: string;

  @Column('enum', { enum: ['Pendiente', 'Completado', 'Cancelado'] })
  estado_pago: boolean;
}
