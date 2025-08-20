import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
import { EstadoTurno } from "src/enums/rolePagos.enum";

@Entity()
export class Turno {
 @PrimaryGeneratedColumn()
    id:number;

    @Column({ type: 'timestamp' })
    fecha_turno: Date;

    @Column({ type: 'enum', enum: EstadoTurno, default: EstadoTurno.PENDIENTE })
  estado: EstadoTurno;

     @Column()
     observaciones:string;

    @Column({ type: 'timestamp' })
    fecha_registro: Date;
    
    @Column({ type: 'timestamp' })
   actualizaciones_turno: Date;
   }