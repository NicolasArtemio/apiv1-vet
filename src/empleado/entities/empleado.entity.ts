import { Inventario } from '../../inventario/entities/inventario.entity';
import { Venta } from '../../ventas/entities/venta.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @Column()
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
  @OneToMany(() => Inventario, (inventario) => inventario.empleado)
  inventarios: Inventario[];

  @OneToOne(() => Usuario, (usuario) => usuario.empleado)
  @JoinColumn()
  usuario: Usuario;
}
