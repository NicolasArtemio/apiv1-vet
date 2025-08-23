import { Type } from 'class-transformer';
import { IsDate, IsInt, IsPositive, ValidateNested } from 'class-validator';
import { CreateDetalleVentaDto } from 'src/detalle_venta/dto/create-detalle_venta.dto';

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
  @Type(() => Date)
  fecha: Date;

  @ValidateNested({ each: true })
  @Type(() => CreateDetalleVentaDto)
  detalleVenta: CreateDetalleVentaDto[];
}
