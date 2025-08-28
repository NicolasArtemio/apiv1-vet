import { Cliente } from "src/cliente/entities/cliente.entity";
import { Turno } from "src/turno/entities/turno.entity";
import { Vacunacion } from "src/vacunacion/entities/vacunacion.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
    
    @OneToMany(() => Turno,turno => turno.mascota)
    turno:Turno[];

    @ManyToOne(() => Cliente, cliente => cliente.mascota)
    @JoinColumn({name: "cliente_id"})
    cliente:Cliente;

    @OneToMany(() => Vacunacion, vacunacion => vacunacion.mascota)
    @JoinColumn({name: "cliente_id"})
    vacunacion: Vacunacion;


}
