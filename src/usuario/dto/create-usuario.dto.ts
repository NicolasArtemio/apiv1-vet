import { IsDate, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Rol } from "src/enums/Rol.enum";

export class CreateUsuarioDto {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    contrasena: string;

    @IsString()
    @IsNotEmpty()
    @IsEnum( Rol, {
        message: 'El rol debe ser uno de los siguientes: admin, user, empleado',
    })
    rol: Rol;

    @IsDate()
    @IsNotEmpty()
    fecha_registro: Date;

    @IsString()
    @IsNotEmpty()
    estado: string;
}
