import { Cliente } from 'src/cliente/entities/cliente.entity';
import { EstadoUsuario } from 'src/enums/EstadoUsuario.enum';
import { Rol } from 'src/enums/Rol.enum';
import { Mensaje } from 'src/mensaje/entities/mensaje.entity';
import { Notificacion } from 'src/notificaciones/entities/notificacione.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';

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

  @Column('timestamp')
  fecha_registro: Date;

   @Column( 'enum', { enum: EstadoUsuario })
   estado: EstadoUsuario;

  @OneToMany(() => Mensaje, (mensaje) => mensaje.usuario)
  mensajes: Mensaje[];

  @OneToMany(() => Mensaje, (mensaje) => mensaje.usuario)
  mensaje: Mensaje[];

  @OneToMany(() => Notificacion, (notificacion) => notificacion.usuario)
  notificaciones: Notificacion[];

  @OneToOne(() => Cliente, (cliente) => cliente.usuario)
  cliente: Cliente;
  empleado: any;
}
