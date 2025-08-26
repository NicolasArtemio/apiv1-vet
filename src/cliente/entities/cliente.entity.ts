import { Mascota } from "src/mascotas/entities/mascota.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  foto_perfil: string;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column('timestamp')
  fecha_nacimiento: Date;

  @Column('int')
  dni: number;

  @Column()
  telefono: string;

  @Column()
  ciudad: string;

  @Column()
  direccion: string;

  @OneToOne(() => Usuario, usuario => usuario.cliente )
  
  @JoinColumn({name: "usuario_id"  })
  usuario : Usuario;

  @OneToMany(() => Mascota, mascota => mascota.cliente )
  mascota: Mascota; 
  


}
