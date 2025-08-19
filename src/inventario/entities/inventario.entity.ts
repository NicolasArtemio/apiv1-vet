import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
