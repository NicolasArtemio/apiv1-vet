import { Venta } from 'src/ventas/entities/venta.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Empleado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column('timestamp')
  fecha_nacimiento: Date;

  @Column('int')
  dni: number;

  @Column()
  telefono: string;

  @Column()
  ciudad: string;

  @Column()
  direccion: string;

  @Column()
  especialidad: string;

  @OneToMany(() => Venta, (venta) => venta.empleado)
  ventas: Venta[];
}
