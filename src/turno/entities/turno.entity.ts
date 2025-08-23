import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
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

   @Column({ type: 'timestamp' })
   fecha_registro: Date;

   @Column({ type: 'timestamp' })
   actualizaciones_turno: Date;

   @ManyToOne(() => Mascota, mascota => mascota.turnos)
   @JoinColumn({ name: 'mascota_id' })
   mascota: Mascota;

}