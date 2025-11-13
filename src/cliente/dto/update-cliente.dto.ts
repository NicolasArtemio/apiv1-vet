import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateUsuarioDto } from '../../usuario/dto/update-usuario.dto';
import { PartialType } from '@nestjs/mapped-types/dist';
import { CreateClienteDto } from './create-cliente.dto';

export class UpdateClienteDto extends PartialType(CreateClienteDto) {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  direccion?: string;

  @IsOptional()
  @Type(() => Date)
  fecha_nacimiento?: Date;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateUsuarioDto)
  usuario?: UpdateUsuarioDto;
}
