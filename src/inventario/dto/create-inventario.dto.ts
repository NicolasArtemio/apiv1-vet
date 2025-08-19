import { Type } from 'class-transformer';
import {
  IsPositive,
  IsInt,
  IsNotEmpty,
  IsDate,
  IsOptional,
} from 'class-validator';

export class CreateInventarioDto {
  @IsPositive()
  @IsInt()
  @IsNotEmpty()
  id_producto: number;

  @IsPositive()
  @IsInt()
  @IsNotEmpty()
  id_empleado: number;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  fecha_uso: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  fecha_devolucion?: Date;
}
