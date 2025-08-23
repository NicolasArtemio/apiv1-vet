import { IsDate, IsEnum, IsNotEmpty, IsString, } from "class-validator";
import { EstadoTurno } from "src/enums/estadoTurno.enum";
export class CreateTurnoDto {


    @IsDate()
    @IsNotEmpty()
    fecha_turno: Date;

    @IsEnum(EstadoTurno)
    @IsNotEmpty()
    estado: EstadoTurno;

    @IsString()
    @IsNotEmpty()
    observaciones: string;

    @IsDate()
    @IsNotEmpty()
    fecha_registro: Date;

    @IsDate()
    @IsNotEmpty()
    actualizaciones_turno: Date;

}
