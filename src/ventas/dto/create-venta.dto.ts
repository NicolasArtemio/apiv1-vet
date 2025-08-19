import { IsDate, IsInt, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateVentaDto {
  @IsPositive()
  @IsInt()
  id_cliente: number;

  @IsPositive()
  @IsInt()
  id_empleado: number;

  @IsPositive()
  total: number;

  @IsDate()
  fecha: Date;
}
