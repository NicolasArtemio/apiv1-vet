import {IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, } from "class-validator";
import { EstadoTurno } from "../../enums/estadoTurno.enum";


export class CreateTurnoDto {

    @IsDateString()
    @IsNotEmpty()
    fecha_turno: Date;

    @IsOptional() // porque en la entidad ya tiene default
    @IsEnum(EstadoTurno)
    estado?: EstadoTurno;

    @IsString()
    @IsNotEmpty()
    observaciones: string;
    
   

}
