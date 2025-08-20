import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

export enum TipoNotificacion {
  INFO = 'info',
  ALERTA = 'alerta',
  RECORDATORIO = 'recordatorio',
}

export enum EstadoLectura {
  NO_LEIDO = 'no_leido',
  LEIDO = 'leido',
}


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
