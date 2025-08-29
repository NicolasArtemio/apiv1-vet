/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Venta } from 'src/ventas/entities/venta.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToOne(() => Usuario, (usuario) => usuario.empleado, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @OneToMany(() => Venta, (venta) => venta.empleado)
  ventas: Venta[];
}
