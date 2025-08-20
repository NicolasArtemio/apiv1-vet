import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
import { EstadoTurno } from "src/enums/rolePagos.enum";
import { Mascota } from 'src/mascotas/entities/mascota.entity';

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

   @ManyToOne(() => Mascota, mascota => mascota.turno)
   mascota: Mascota;
   }