import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { EstadoLectura } from 'src/enums/estado-lectura.enum';
import { TipoNotificacion } from 'src/enums/tipo-notificacion.enum';

export class CreateNotificacioneDto {
  @IsString()
  titulo: string;

  @IsString()
  mensaje: string;

  @IsEnum(TipoNotificacion)
  tipo_noti: TipoNotificacion;

  @IsOptional()
  @IsEnum(EstadoLectura)
  leido?: EstadoLectura;

  @IsOptional()
  @IsDateString()
  fecha_lectura?: Date;

  @IsInt()
  @IsPositive()
  usuario_id: number; // <-- ESTE ES EL CORRECTO
}
