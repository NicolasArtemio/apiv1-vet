import { Type } from 'class-transformer';
import {
  IsPositive,
  IsInt,
  IsDate,
  IsNotEmpty,
  IsEnum,
  IsString,
} from 'class-validator';
import { EstadoPagos } from 'src/enums/estado-pagos.enum';
import { TipoPagos } from 'src/enums/tipo-pagos.enum';

export class CreatePagoDto {
  @IsPositive()
  @IsInt()
  id_venta?: number;

  @IsDate()
  @Type(() => Date)
  fecha_pago?: Date;

  @IsPositive()
  @IsInt()
  monto_pago: number;

  @IsString()
  @IsNotEmpty()
  paymentIdMP: string;

  @IsNotEmpty()
  @IsEnum(TipoPagos, {
    message:
      'El método de pago debe ser uno de los tipos definidos en TipoPagos enum',
  })
  metodo_pago: TipoPagos;

  @IsNotEmpty()
  @IsEnum(EstadoPagos, {
    message:
      'El estado del pago debe ser uno de los tipos definidos en EstadoPagos enum',
  })
  estado_pago: EstadoPagos;
}
