
import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity()
export class Mensaje {

    @PrimaryGeneratedColumn()
    id_mensaje: number;

    @Column()
    contenido: string;

    @Column({ type: 'timestamp' })
    fecha_envio: Date;
    
    @Column()
    leido: boolean;

}
