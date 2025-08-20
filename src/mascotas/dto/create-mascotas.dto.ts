import {IsBoolean, IsNotEmpty, IsNumber, IsString, IsUrl, Min } from 'class-validator';

export class CreateMascotasDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

     @IsString()
    @IsNotEmpty()
    especie: string;

     @IsString()
    @IsNotEmpty()
    raza: string;

    @IsNumber({ maxDecimalPlaces: 2 },)
    @Min(0.1)
    pesoKG: number;

    @IsNumber()
    @IsNotEmpty()
    edad: number;

    @IsString()
    @IsBoolean()
    esterilizado: boolean;   

    @IsString()
    @IsUrl()
    foto: string

    @IsString()
    @IsNotEmpty()
    observaciones: string;

}