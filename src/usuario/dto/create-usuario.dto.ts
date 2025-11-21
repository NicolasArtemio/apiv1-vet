import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDate,
} from 'class-validator';
import { EstadoUsuario } from 'src/enums/estado-usuario.enum';
import { Rol } from 'src/enums/rol.enum';

export class CreateUsuarioDto {
  @IsOptional()
  id_usuario?: number;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  contrasena: string;

  @IsOptional()
  @IsEnum(Rol, {
    message: 'El rol debe ser uno de los siguientes: admin, user, empleado',
  })
  rol?: Rol;

  @IsOptional()
  @IsDate()
  fecha_registro?: Date;

  @IsOptional()
  @IsEnum(EstadoUsuario, {
    message:
      'El estado debe ser uno de los siguientes: activo, inactivo, suspendido',
  })
  estado?: EstadoUsuario;
}
