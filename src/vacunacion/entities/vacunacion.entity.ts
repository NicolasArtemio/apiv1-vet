import { Mascota } from "src/mascotas/entities/mascota.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
   
@Entity() 
export class Vacunacion {
 @PrimaryGeneratedColumn()
 id:number;

 @Column({type: 'timestamp'})
 fecha: Date;

 @Column()
 nombre_vacuna: string;

 @Column()
 nro_serie: number;

 @Column({type: 'timestamp'})
 prox_dosis: Date;

 @Column()
 nombre_veterinario: string;

 @Column()
 firma_sello: string;

 @ManyToOne(() => Mascota, mascota => mascota.vacunacion)
 @JoinColumn({name: "mascota_id"})
 mascota: Mascota;
 
}
