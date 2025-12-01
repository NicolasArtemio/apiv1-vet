import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Mascota } from '../../mascotas/entities/mascota.entity';
import { EstadoTurno } from 'src/enums/estado-turno.enum';
import { TipoTurno } from 'src/enums/tipo-turno.enum';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Entity()
export class Turno {
  @PrimaryGeneratedColumn()
  id_turno: number;

  @Column({ type: 'timestamp' })
  fecha_turno: Date;

  @Column({ type: 'enum', enum: EstadoTurno, default: EstadoTurno.PENDIENTE })
  estado: EstadoTurno;

  @Column({ type: 'enum', enum: TipoTurno })
  tipo: TipoTurno;

  @Column()
  observaciones: string;

  @CreateDateColumn({ type: 'timestamp' })
  fecha_registro: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  actualizaciones_turno: Date;

  @ManyToOne(() => Mascota, (mascota) => mascota.turno, { eager: true })
  @JoinColumn({ name: 'mascota_id' })
  mascota: Mascota;

  @ManyToOne(() => Usuario, (usuario) => usuario.turnos)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;
}
