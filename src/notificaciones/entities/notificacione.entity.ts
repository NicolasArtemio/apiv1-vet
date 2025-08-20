import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
import { TipoNotificacion, EstadoLectura } from 'src/enums/rolePagos.enum';

@Entity()
export class Notificacion {
 @PrimaryGeneratedColumn()
    id:number;

    @Column()
    titulo:string;

    @Column()
    mensaje:string;

    @Column({ type: 'enum', enum: TipoNotificacion })
    tipo_noti: TipoNotificacion;

   @Column({ type: 'enum', enum: EstadoLectura, default: EstadoLectura.NO_LEIDO })
   leido: EstadoLectura;
    @Column({ type: 'timestamp' })
    fecha_creacion: Date;

     @Column({ type: 'timestamp' })
    fecha_lectura: Date;
}
