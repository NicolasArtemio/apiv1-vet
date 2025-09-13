/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne 
} from 'typeorm';
import { Rol } from 'src/enums/Rol.enum';
import { EstadoUsuario } from 'src/enums/EstadoUsuario.enum';
import { Mensaje } from 'src/mensaje/entities/mensaje.entity';
import { Notificacion } from 'src/notificaciones/entities/notificacione.entity';
import { Empleado } from 'src/empleado/entities/empleado.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ select: false })
  contrasena: string;

  @Column('enum', { enum: Rol })
  rol: Rol;

  @Column('timestamp')
  fecha_registro: Date;

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
