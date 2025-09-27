import { IsEmail, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @Transform(({ value }: { value: string }): string => value.trim())
  contrasena: string;
}
