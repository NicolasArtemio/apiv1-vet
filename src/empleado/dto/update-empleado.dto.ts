import { PartialType } from '@nestjs/mapped-types';
import { CreateEmpleadoDto } from './create-empleado.dto';
import { UpdateUsuarioDto } from '../../usuario/dto/update-usuario.dto';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateEmpleadoDto extends PartialType(CreateEmpleadoDto) {
    @IsOptional()
    @IsString()
    nombre?: string;
  
    @IsOptional()
    @IsString()
    direccion?: string;
  
    @IsOptional()
    @ValidateNested()
    @Type(() => UpdateUsuarioDto)
    usuario?: UpdateUsuarioDto;
}
