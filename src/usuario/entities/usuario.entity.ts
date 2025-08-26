import { Cliente } from "src/cliente/entities/cliente.entity";
import { Mensaje } from "src/mensaje/entities/mensaje.entity";
import { Notificacion } from "src/notificaciones/entities/notificacione.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, OneToOne} from "typeorm";

@Entity()
export class Usuario {
   @PrimaryGeneratedColumn()
   id: number;

   @Column('varchar', { length: 255 })
   email: string;

   @Column('varchar', { length: 255 })
   contrasena: string;

   @Column('enum', { enum: Rol })
   rol: Rol;

   @Column('timestamp')
   fecha_registro: Date;

   @Column('varchar', { length: 255 })
   estado: string;

   @OneToMany(() => Mensaje, mensaje => mensaje.usuario)
   mensajes: Mensaje[];

    @OneToMany(() => Mensaje, mensaje => mensaje.usuarios)
    mensaje: Mensaje[];
    
    @OneToMany(() => Notificacion, notificacion => notificacion.usuarios)
   notificacione: Notificacion[];

   @OneToOne(() => Cliente, cliente => cliente.usuario)
   cliente: Cliente;

   
}
