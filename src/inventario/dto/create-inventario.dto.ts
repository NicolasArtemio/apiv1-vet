import { Type } from 'class-transformer';
import {
  IsPositive,
  IsInt,
  IsNotEmpty,
  IsDate,
  IsOptional,
  Min,
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

  @IsPositive()
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  cantidad: number;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  fecha_uso: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  fecha_devolucion?: Date;
}
