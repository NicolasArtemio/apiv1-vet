import { PartialType } from '@nestjs/mapped-types';
import { CreateMascotasDto } from './create-mascotas.dto';

export class UpdateMascotasDto extends PartialType(CreateMascotasDto) {}
