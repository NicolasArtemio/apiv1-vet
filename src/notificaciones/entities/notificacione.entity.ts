import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TipoNotificacion } from '../../enums/tipoNotificacion.enum';
import { EstadoLectura } from '../../enums/estadoLectura.enum';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity()
export class Notificacion {
  @PrimaryGeneratedColumn()
  id_notificaciones: number;

  @Column()
  titulo: string;

  @Column()
  mensaje: string;

  @Column({ type: 'enum', enum: TipoNotificacion })
  tipo_noti: TipoNotificacion;

  @Column({
    type: 'enum',
    enum: EstadoLectura,
    default: EstadoLectura.NO_LEIDO,
  })
  leido: EstadoLectura;

 @CreateDateColumn({ type: 'timestamp' })
fecha_creacion: Date;

  @Column({ type: 'timestamp', nullable: true })
  fecha_lectura: Date;

  @ManyToOne(() => Usuario, (usuario) => usuario.notificaciones, {
    eager: true,
  })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;
}
