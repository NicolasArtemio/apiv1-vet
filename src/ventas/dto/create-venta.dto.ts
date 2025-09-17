import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsInt,
  IsPositive,
  ValidateNested,
} from 'class-validator';
import { CreateDetalleVentaDto } from '../../detalle_venta/dto/create-detalle_venta.dto';
import { EstadoPagos } from '../../enums/EstadoPagos.enum';
import { TipoPagos } from '../../enums/TipoPagos.enum';

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

  @IsEnum(TipoPagos)
  metodo_pago: TipoPagos;

  @IsEnum(EstadoPagos)
  estado_pago: EstadoPagos;
}