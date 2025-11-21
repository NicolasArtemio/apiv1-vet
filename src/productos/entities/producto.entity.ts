import { SubcategoriaProducto } from 'src/enums/subcategoria-producto.enum';
import { DetalleVenta } from '../../detalle_venta/entities/detalle_venta.entity';
import { CategoriaProducto } from '../../enums/categoria-producto.enum';
import { Inventario } from '../../inventario/entities/inventario.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TipoUso } from 'src/enums/tipo-uso.enum';
import { Url } from 'url';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  img:string;

  @Column()
  marca: string;

  @Column()
  descripcion: string;

  @Column()
  kg: number;

  @Column('decimal')
  precio: number;

  @Column()
  stock: number;

  @Column('enum', { enum: CategoriaProducto })
  categoria: CategoriaProducto;

  @Column('enum', { enum: SubcategoriaProducto })
  subcategoria: SubcategoriaProducto;

  @Column('enum', { enum: TipoUso })
  tipo_uso: TipoUso;

  @Column('date')
  fecha_vencimiento: Date;

  @OneToMany(() => Inventario, (inventario) => inventario.producto)
  inventarios: Inventario[];

  @OneToMany(() => DetalleVenta, (detalleVenta) => detalleVenta.producto)
  detallesVenta: DetalleVenta[];
}
