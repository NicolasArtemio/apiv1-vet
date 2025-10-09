/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne, 
  CreateDateColumn
} from 'typeorm';
import { Rol } from '../../enums/Rol.enum';
import { EstadoUsuario } from '../../enums/EstadoUsuario.enum';
import { Mensaje } from '../../mensaje/entities/mensaje.entity';
import { Notificacion } from '../../notificaciones/entities/notificacione.entity';
import { Empleado } from '../../empleado/entities/empleado.entity';
import { Cliente } from '../../cliente/entities/cliente.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  contrasena: string;

  @Column('enum', { enum: Rol })
  rol: Rol;

  @CreateDateColumn({ name: 'fecha_registro' })
  fechaRegistro: Date;

  @Column('enum', {
    enum: EstadoUsuario,
    default: EstadoUsuario.ACTIVO,
  })
  estado: EstadoUsuario;

  @OneToMany(() => Mensaje, (mensaje) => mensaje.usuario)
  mensajes: Mensaje[];

  @OneToMany(() => Notificacion, (notificacion) => notificacion.usuario)
  notificaciones: Notificacion[];

  @OneToOne(() => Empleado, (empleado) => empleado.usuario)
  empleado: Empleado;

  @OneToOne(() => Cliente, (cliente) => cliente.usuario)
  cliente: Cliente;
}
