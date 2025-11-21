import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { EstadoLectura } from 'src/enums/estado-lectura.enum';
import { TipoNotificacion } from 'src/enums/tipo-notificacion.enum';

export class CreateNotificacioneDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  mensaje: string;

  @IsEnum(TipoNotificacion)
  @IsNotEmpty()
  tipo_noti: TipoNotificacion;

  @IsEnum(EstadoLectura)
  @IsOptional()
  leido?: EstadoLectura;

  @IsDateString()
  @IsOptional()
  fecha_lectura?: Date;
}
