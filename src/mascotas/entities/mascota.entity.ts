import { Turno } from "src/turno/entities/turno.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Mascota {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;
    
    
    @Column()
    especie: string;

    
    @Column()
    raza: string;

    
    @Column({type: 'decimal'})
    peso:number;

    
    @Column()
    edad: number;

    
    @Column()
    esterilizado: boolean;

    
    @Column()
    foto: string;

    
    @Column()
    observaciones: string;
    
    @OneToMany(() => Turno, turno => turno.mascota)
    turnos: Turno[];
}
