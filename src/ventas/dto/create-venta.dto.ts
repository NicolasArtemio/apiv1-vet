import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsInt,
  IsNumber,
  IsPositive,
  Min,
  ValidateNested,
} from 'class-validator';
import { CreateDetalleVentaDto } from '../../detalle_venta/dto/create-detalle_venta.dto';
import { EstadoPagos } from 'src/enums/estado-pagos.enum';
import { TipoPagos } from 'src/enums/tipo-pagos.enum';
import { CreatePagoDto } from 'src/pago/dto/create-pago.dto';

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

  @IsPositive()
  @IsNumber()
  @Min(0.01)
  total?: number;

  @IsEnum(EstadoPagos)
  estado_pago: EstadoPagos;

  @Type(() => CreatePagoDto)
  @ValidateNested()
  pago?: CreatePagoDto;
}
