import { DetalleVenta } from '../../detalle_venta/entities/detalle_venta.entity';
import { CategoriaProducto } from '../../enums/CategoriaProducto.enum';
import { TipoUso } from '../../enums/TipoUso.enum';
import { Inventario } from '../../inventario/entities/inventario.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column('enum', { enum: CategoriaProducto })
  categoria: CategoriaProducto;

  @Column('enum', { enum: TipoUso })
  tipo_uso: TipoUso;

  @Column('date')
  fecha_vencimiento: Date;

  @OneToMany(() => Inventario, (inventario) => inventario.producto)
  inventarios: Inventario[];

  @OneToMany(() => DetalleVenta, (detalleVenta) => detalleVenta.producto)
  detallesVenta: DetalleVenta[];
}
