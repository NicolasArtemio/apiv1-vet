import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  TableInheritance,
  OneToMany,
} from 'typeorm';
import { Rol } from 'src/enums/Rol.enum';
import { EstadoUsuario } from 'src/enums/EstadoUsuario.enum';
import { Mensaje } from 'src/mensaje/entities/mensaje.entity';
import { Notificacion } from 'src/notificaciones/entities/notificacione.entity';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class Usuario {
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

  @Column('enum', { enum: EstadoUsuario })
  estado: EstadoUsuario;

  @OneToMany(() => Mensaje, (mensaje) => mensaje.usuario)
  mensajes: Mensaje[];

  @OneToMany(() => Notificacion, (notificacion) => notificacion.usuario)
  notificaciones: Notificacion[];
}
