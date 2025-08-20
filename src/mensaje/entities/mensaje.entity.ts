
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

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
    
@ManyToOne(() => Usuario, usuario => usuario.notificacione)
 usuario: Usuario;
}
