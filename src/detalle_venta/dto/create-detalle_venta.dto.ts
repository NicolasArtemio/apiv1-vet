import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';
export class CreateDetalleVentaDto {
  @IsPositive()
  @IsInt()
  @IsNotEmpty()
  id_producto: number;

  @IsPositive()
  @IsInt()
  @IsNotEmpty()
  cantidad: number;
}
