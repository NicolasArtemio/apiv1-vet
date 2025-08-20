import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
   
@Entity() 
export class Vacunacion {
 @PrimaryGeneratedColumn({type: 'number'})
 id:number;

 @Column({type: 'timestamp'})
 fecha: Date;

 @Column({type: 'string'})
 nombre_vacuna: string;

 @Column({type: 'number'})
 nro_serie: number;

 @Column({type: 'timestamp'})
 prox_dosis: Date;

 @Column({type: 'string'})
 nombre_veterinario: string;

 @Column({type: 'string'})
 firma_sello: string;
}
