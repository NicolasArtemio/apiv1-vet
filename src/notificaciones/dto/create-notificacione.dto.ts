import { IsDate, IsEnum, IsNotEmpty, IsString, } from "class-validator";
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
    @IsNotEmpty()
    leido: EstadoLectura;

    @IsDate()
    @IsNotEmpty()
    fecha_creacion: Date;

    @IsDate()
    @IsNotEmpty()
    fecha_lectura: Date;

}
