import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Url } from "url";

@Entity()
export class Mascota {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'string'})
    nombre: string;
    
    
    @Column({type: 'string'})
    especie: string;

    
    @Column({type: 'string'})
    raza: string;

    
    @Column({type: 'decimal'})
    peso:number;

    
    @Column({type: 'number'})
    edad: number;

    
    @Column({type: 'boolean'})
    esterilizado: boolean;

    
    @Column({type: 'string'})
    foto: Url;

    
    @Column({type: 'string'})
    observaciones: string;
}
