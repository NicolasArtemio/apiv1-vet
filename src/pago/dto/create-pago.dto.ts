import {
  IsPositive,
  IsInt,
  IsDate,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreatePagoDto {
  @IsPositive()
  @IsInt()
  id_venta: number;

  @IsDate()
  fecha_pago: Date;

  @IsPositive()
  @IsInt()
  monto_pago: number;

  @IsNotEmpty()
  @IsString()
  metodo_pago: 'Efectivo' | 'Tarjeta' | 'Transferencia';

  @IsNotEmpty()
  @IsString()
  estado_pago: 'Pendiente' | 'Completado' | 'Cancelado';
}
