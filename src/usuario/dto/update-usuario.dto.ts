import { IsEmail, IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateUsuarioDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  contrasena?: string;

  @IsOptional()
  @IsString()
  foto_perfil?: string;

  @IsOptional()
  @IsString()
  apellido?: string;

  @IsOptional()
  @IsDateString()
  fecha_nacimiento?: string;

  @IsOptional()
  dni?: number;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsString()
  ciudad?: string;
}

