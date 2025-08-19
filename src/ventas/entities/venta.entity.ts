import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';

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
}
