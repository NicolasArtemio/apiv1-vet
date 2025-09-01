
import { IsBoolean, IsDate, IsOptional, IsString, MinLength } from 'class-validator';
import { CreateMensajeDto } from './create-mensaje.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateMensajeDto extends PartialType (CreateMensajeDto) {}
