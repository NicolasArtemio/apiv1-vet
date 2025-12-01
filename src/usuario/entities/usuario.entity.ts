/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  CreateDateColumn,
} from 'typeorm';
import { Mensaje } from '../../mensaje/entities/mensaje.entity';
import { Notificacion } from '../../notificaciones/entities/notificacione.entity';
import { Empleado } from '../../empleado/entities/empleado.entity';
import { Cliente } from '../../cliente/entities/cliente.entity';
import { EstadoUsuario } from 'src/enums/estado-usuario.enum';
import { Rol } from 'src/enums/rol.enum';
import { Turno } from 'src/turno/entities/turno.entity';

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

  @OneToMany(() => Turno, (turno) => turno.usuario)
  turnos: Turno[];
}
