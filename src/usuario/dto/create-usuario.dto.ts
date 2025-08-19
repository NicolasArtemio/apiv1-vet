import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateUsuarioDto {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    contrasena: string;

    @IsString()
    @IsNotEmpty()
    rol: 'admin' | 'user' | 'empleado';

    @IsDate()
    @IsNotEmpty()
    fecha_registro: Date;

    @IsString()
    @IsNotEmpty()
    estado: string;
}
