import { IsDate, IsNotEmpty, IsString, IsBoolean, MinLength, IsDateString, IsOptional } from "class-validator";

export class CreateMensajeDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  contenido: string;

  @IsDateString()
  @IsOptional() 
  fecha_envio?: Date;

  @IsBoolean()
  @IsOptional() 
  leido?: boolean;

}
