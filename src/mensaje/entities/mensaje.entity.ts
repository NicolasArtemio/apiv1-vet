
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, } from 'typeorm';

@Entity()
export class Mensaje {

    @PrimaryGeneratedColumn()
    id_mensaje: number;

    @Column()
    contenido: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fecha_envio: Date;

  @Column({ default: false })
  leido: boolean;

    @ManyToOne(() => Usuario, usuario => usuario.mensajes, { eager: true })
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;
}

