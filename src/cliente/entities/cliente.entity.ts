import { ChildEntity, Column, OneToMany } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Mascota } from '../../mascotas/entities/mascota.entity';

@ChildEntity()
export class Cliente extends Usuario {
  @Column()
  foto_perfil: string;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column('timestamp')
  fecha_nacimiento: Date;

  @Column({ unique: true })
  dni: number;

  @Column()
  telefono: string;

  @Column()
  ciudad: string;

  @Column()
  direccion: string;

  @OneToMany(() => Mascota, (mascota) => mascota.cliente)
  mascotas: Mascota[];
}
