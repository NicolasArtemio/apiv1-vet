import { Mensaje } from "src/mensaje/entities/mensaje.entity";
import { Notificacion } from "src/notificaciones/entities/notificacione.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuario {
   @PrimaryGeneratedColumn()
   id: number;

   @Column('varchar', { length: 255 })
   email: string;

   @Column('varchar', { length: 255 })
   contrasena: string;

   @Column('enum', { enum: ['admin', 'user', 'empleado'] })
   rol: string;

   @Column('timestamp')
   fecha_registro: Date;

   @Column('varchar', { length: 255 })
   estado: string;

   @OneToMany(() => Mensaje, mensaje => mensaje.usuario)
   mensajes: Mensaje[];

   @OneToMany(() => Notificacion, notificacion => notificacion.usuario)
   notificaciones: Notificacion[];

}
