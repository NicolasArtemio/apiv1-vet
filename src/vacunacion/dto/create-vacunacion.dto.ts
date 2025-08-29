import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVacunacionDto {
  @IsNumber()
  @IsNotEmpty()
  mascota_id: number;

  @IsString()
  @IsNotEmpty()
  fecha: Date;

  @IsString()
  @IsNotEmpty()
  nombre_vacuna: string;

  @IsNumber()
  @IsNotEmpty()
  nro_serie: number;

  @IsString()
  @IsNotEmpty()
  prox_dosis: Date;

  @IsString()
  @IsNotEmpty()
  nombre_veterinario: string;

  @IsString()
  @IsNotEmpty()
  firma_sello: string;
}

