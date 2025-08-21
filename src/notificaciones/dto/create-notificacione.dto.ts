import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString, } from "class-validator";
import { EstadoLectura, TipoNotificacion } from 'src/enums/rolePagos.enum';
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

    @IsDate()
     @IsOptional()
    fecha_creacion?: Date;

    @IsDate()
    @IsOptional()
    fecha_lectura?: Date;

}
