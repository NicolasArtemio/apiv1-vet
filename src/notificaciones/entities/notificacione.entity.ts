import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TipoNotificacion } from 'src/enums/tipoNotificacion.enum';
import { EstadoLectura } from 'src/enums/estadoLectura.enum';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Entity()
export class Notificacion {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column({ type: 'timestamp' })
  fecha_creacion: Date;

  @Column({ type: 'timestamp' })
  fecha_lectura: Date;

  @ManyToOne(() => Usuario, (usuario) => usuario.notificaciones, {
    eager: true,
  })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;
}
