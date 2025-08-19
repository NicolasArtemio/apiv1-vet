import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuario {
   @PrimaryGeneratedColumn()
    id:number;

    @Column('varchar', { length: 255 })
    email:string;

    @Column('varchar', { length: 255 })
    contrasena:string;

    @Column('enum', { enum: ['admin', 'user', 'empleado'] })
    rol:string;

    @Column('timestamp')
    fecha_registro:Date;

    @Column('varchar', { length: 255 })
    estado:string;
}
