import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  marca: string;

  @Column()
  descripcion: string;

  @Column('decimal')
  precio: number;

  @Column()
  stock: number;
  @Column('enum')
  categoria: string;

  @Column()
  typo_uso: string;
  @Column('date')
  fecha_vencimiento: Date;
}
