
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

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

    @ManyToOne(() => Usuario, usuario => usuario.mensajes)
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;
}
