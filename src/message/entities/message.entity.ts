import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('messages')
export class Message {
  // Usamos el ID de pago de Mercado Pago como clave primaria para evitar duplicados.
  @PrimaryColumn()
  id: string;

  @Column()
  text: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
