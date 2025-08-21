import { IsDate, IsNotEmpty, IsString, IsBoolean } from "class-validator";

export class CreateMensajeDto {
    @IsString()
    @IsNotEmpty()
    contenido: string;


    @IsDate()
    @IsNotEmpty()
    fecha_envio: Date;


    @IsBoolean()
    @IsNotEmpty()
    leido: boolean;

}
