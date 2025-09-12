import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { EstadoUsuario } from "src/enums/EstadoUsuario.enum";
import { Rol } from "src/enums/Rol.enum";

export class CreateUsuarioDto {
    @IsNotEmpty()
    id_usuario?: number;

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
    @Type(() => Date)
    @IsNotEmpty()
    fecha_registro: Date;

    @IsString()
    @IsNotEmpty()
    @IsEnum(EstadoUsuario, {
        message: 'El estado debe ser uno de los siguientes: activo, inactivo, suspendido',
    })
    estado: EstadoUsuario;
}
