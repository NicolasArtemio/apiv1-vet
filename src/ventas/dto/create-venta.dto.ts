import { Type } from 'class-transformer';
import { IsArray, IsDate, IsInt, IsPositive, ValidateNested } from 'class-validator';
import { CreateDetalleVentaDto } from 'src/detalle_venta/dto/create-detalle_venta.dto';

export class CreateVentaDto {
  @IsPositive()
  @IsInt()
  id_cliente: number;

  @IsPositive()
  @IsInt()
  id_empleado: number;

  @IsDate()
  @Type(() => Date)
  fecha: Date;


   @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDetalleVentaDto)
  detalles: CreateDetalleVentaDto[];
}