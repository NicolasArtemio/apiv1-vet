import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { EstadoTurno } from 'src/enums/estado-turno.enum';
import { TipoTurno } from 'src/enums/tipo-turno.enum';

export class CreateTurnoDto {
  @IsNumber()
  @IsOptional() // opcional porque lo vas a agregar desde el token
  id_usuario?: number;

  @IsDateString()
  @IsNotEmpty()
  fecha_turno: Date;

  @IsEnum(TipoTurno)
  tipo: TipoTurno;

  @IsOptional()
  @IsEnum(EstadoTurno)
  estado?: EstadoTurno;

  @IsString()
  @IsNotEmpty()
  observaciones: string;

  @IsNumber()
  @IsNotEmpty()
  mascota_id: number;
}
