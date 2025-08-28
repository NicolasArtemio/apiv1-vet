
import { IsBoolean, IsDate, IsOptional, IsString, MinLength } from 'class-validator';
import { CreateMensajeDto } from './create-mensaje.dto';

export class UpdateMensajeDto{
      @IsString()
       @MinLength(5)
        @IsOptional()
        contenido?: string;
    
    
        @IsDate()
       @IsOptional()
        fecha_envio?: Date;
    
    
        @IsBoolean()
         @IsOptional()
        leido?: boolean;
    
}
