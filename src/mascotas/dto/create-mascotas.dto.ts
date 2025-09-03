import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateMascotasDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  cliente_id: number;

  @IsString()
  @IsNotEmpty()
  especie: string;

  @IsString()
  @IsNotEmpty()
  raza: string;

  @IsInt()
  @Min(0)
  peso: number;

  @IsInt()
  @IsNotEmpty()
  @Min(0)
  edad: number;

  @IsBoolean()
  esterilizado: boolean;

  @IsString()
  @IsOptional()
  foto?: string;

  @IsString()
  @IsNotEmpty()
  observaciones: string;
}
