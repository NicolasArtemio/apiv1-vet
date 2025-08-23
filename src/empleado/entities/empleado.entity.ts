import { Venta } from 'src/ventas/entities/venta.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Empleado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  nombre: string;

  @Column('varchar', { length: 255 })
  apellido: string;

  @Column('timestamp')
  fecha_nacimiento: Date;

  @Column('int')
  dni: number;

  @Column('varchar', { length: 15 })
  telefono: string;

  @Column('varchar', { length: 255 })
  ciudad: string;

  @Column('varchar', { length: 255 })
  direccion: string;

  @Column('varchar', { length: 255 })
  especialidad: string;

  @OneToMany(() => Venta, (venta) => venta.empleado)
  ventas: Venta[];
}
