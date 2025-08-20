import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
import { TipoNotificacion, EstadoLectura } from 'src/enums/rolePagos.enum';
import { Usuario } from 'src/usuario/entities/usuario.entity';

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
    
     @ManyToOne(() => Usuario, usuario => usuario.notificacione)
   usuario: Usuario;
}
