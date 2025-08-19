import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateEmpleadoDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    apellido: string;

    @IsString()
    @IsNotEmpty()
    fecha_nacimiento: Date;

    @IsNumber()
    @IsNotEmpty()
    dni: number;

    @IsString()
    @IsNotEmpty()
    telefono: string;

    @IsString()
    @IsNotEmpty()
    ciudad: string;

    @IsString()
    @IsNotEmpty()
    direccion: string;

    @IsString()
    @IsNotEmpty()
    especialidad: string;
}
