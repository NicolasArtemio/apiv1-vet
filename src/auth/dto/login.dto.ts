import { IsEmail, IsNotEmpty} from 'class-validator';

export class LoginDto  {

    @IsEmail({},{message: "El email debe ser válido"})
    email: string;

    @IsNotEmpty({message: "La contraseña es obligatoria"})
    password: string;
}
