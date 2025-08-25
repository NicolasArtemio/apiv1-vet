import { IsDate, IsNotEmpty, IsString, IsBoolean, MinLength } from "class-validator";

export class CreateMensajeDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    contenido: string;


    @IsDate()
    @IsNotEmpty()
    fecha_envio: Date;


    @IsBoolean()
    @IsNotEmpty()
    leido?: boolean;

}
