import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DetalleVenta {
  @PrimaryGeneratedColumn()
  id_detalle: number;

  @Column()
  id_venta: number;

  @Column()
  id_producto: number;

  @Column()
  cantidad: number;
}
