import { PartialType } from '@nestjs/mapped-types';
import { CreateEmpleadoDto } from './create-empleado.dto';
import { UpdateUsuarioDto } from 'src/usuario/dto/update-usuario.dto';

export class UpdateEmpleadoDto extends PartialType(CreateEmpleadoDto) {
  usuario?: UpdateUsuarioDto;
}
