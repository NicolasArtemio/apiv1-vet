import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class CreateMascotasDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNumber()
  @IsNotEmpty()
  cliente_id: number;

  @IsString()
  @IsNotEmpty()
  especie: string;

  @IsString()
  @IsNotEmpty()
  raza: string;

  @IsInt()
  @Min(1)
  peso: number;

  @IsNumber()
  @IsNotEmpty()
  edad: number;

  @IsBoolean()
  esterilizado: boolean;

  @IsString()
  foto: string;

  @IsString()
  @IsNotEmpty()
  observaciones: string;
}
