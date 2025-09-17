import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateUsuarioDto } from 'src/usuario/dto/create-usuario.dto';
export class CreateClienteDto extends CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  foto_perfil: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido: string;

  @IsDate()
  @Type(() => Date)
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
}
