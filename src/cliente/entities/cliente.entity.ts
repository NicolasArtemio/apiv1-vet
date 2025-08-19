import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  foto_perfil: string;

  @Column('varchar', { length: 255 })
  nombre: string;

  @Column('varchar', { length: 255 })
  apellido: string;

  @Column('timestamp')
  fecha_nacimiento: Date;

  @Column('int')
  dni: number;

  @Column({ type: 'varchar', length: 15 })
  telefono: string;

  @Column('varchar', { length: 255 })
  ciudad: string;

  @Column('varchar', { length: 255 })
  direccion: string;
}
