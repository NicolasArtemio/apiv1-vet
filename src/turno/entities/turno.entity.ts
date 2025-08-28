import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EstadoTurno } from 'src/enums/estadoTurno.enum';
import { Mascota } from 'src/mascotas/entities/mascota.entity';

@Entity()
export class Turno {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  fecha_turno: Date;

  @Column({ type: 'enum', enum: EstadoTurno, default: EstadoTurno.PENDIENTE })
  estado: EstadoTurno;

  @Column()
  observaciones: string;

 @CreateDateColumn({ type: 'timestamp' })
  fecha_registro: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  actualizaciones_turno: Date;

  @ManyToOne(() => Mascota, (mascota) => mascota.turno, { eager: true })
  @JoinColumn({ name: 'mascota_id' })
  mascota: Mascota;
}

