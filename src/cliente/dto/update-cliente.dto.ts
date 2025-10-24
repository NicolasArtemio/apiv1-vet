import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateUsuarioDto } from '../../usuario/dto/update-usuario.dto';
import { PartialType } from '@nestjs/mapped-types/dist';
import { CreateClienteDto } from './create-cliente.dto';

export class UpdateClienteDto
  extends PartialType(CreateClienteDto)
  implements UpdateUsuarioDto
{
  email?: string;
  contrasena?: string;
  foto_perfil?: string;
  apellido?: string;
  fecha_nacimiento?: string;
  dni?: number;
  telefono?: string;
  ciudad?: string;

  // Campos específicos de cliente
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  direccion?: string;
}

