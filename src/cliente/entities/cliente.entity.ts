/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Mascota } from '../../mascotas/entities/mascota.entity';
import { Venta } from 'src/ventas/entities/venta.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  foto_perfil: string;

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

  @OneToMany(() => Mascota, (mascota) => mascota.cliente)
  mascotas: Mascota[];

  @OneToMany(() => Venta, (venta) => venta.cliente)
  venta: Venta[];

  @OneToOne(() => Usuario, (usuario) => usuario.cliente)
  @JoinColumn()
  usuario: Usuario;
}
