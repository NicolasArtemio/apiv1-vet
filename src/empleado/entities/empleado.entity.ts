/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Inventario } from 'src/inventario/entities/inventario.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Venta } from 'src/ventas/entities/venta.entity';
import { ChildEntity, Column, OneToMany } from 'typeorm';

@ChildEntity()
export class Empleado extends Usuario {
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

  @Column()
  especialidad: string;

  @OneToMany(() => Venta, (venta) => venta.empleado)
  venta: Venta[];
  @OneToMany(() => Inventario, (inventario) => inventario.empleado)
  inventarios: Inventario[];
}
