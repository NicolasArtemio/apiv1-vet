import { PartialType } from '@nestjs/mapped-types';
import { CreateClienteDto } from './create-cliente.dto';
import { UpdateUsuarioDto } from 'src/usuario/dto/update-usuario.dto';

export class UpdateClienteDto extends PartialType(CreateClienteDto) {
  usuario?: UpdateUsuarioDto;
}
