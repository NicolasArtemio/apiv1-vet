import { IsEmail, IsNotEmpty, IsNumber, IsString, Matches, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString({ message: "El valor ingresado debe ser texto válido" })
    @IsNotEmpty({ message: "Este campo es obligatorio y no puede estar vacío" })
    @Matches(/^[a-zA-Z]+$/, { message: 'Solo se permiten letras sin espacios ni caracteres especiales' })
    name: string;

    @IsString({ message: "El valor ingresado debe ser texto válido" })
    @IsNotEmpty({ message: "Este campo es obligatorio y no puede estar vacío" })
    @Matches(/^[a-zA-Z]+$/, { message: 'Solo se permiten letras sin espacios ni caracteres especiales' })
    lastName: string;

    @IsString()
    @Matches(/^\d+$/, { message: 'El DNI debe contener solo números' })
    nationalId: string;

    @IsEmail({}, { message: 'Por favor, ingresa un correo electrónico válido.' })
    email: string;

    @IsString({ message: "El valor ingresado debe ser texto válido" })
    @MinLength(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    @Matches(/(?=.*[a-z])/, { message: "La contraseña debe contener al menos una letra minúscula" })
    @Matches(/(?=.*[A-Z])/, { message: "La contraseña debe contener al menos una letra mayúscula" })
    @Matches(/(?=.*\d)/, { message: "La contraseña debe contener al menos un número" })
    @Matches(/(?=.*[@$!%*?&])/, { message: "La contraseña debe contener al menos un carácter especial (@$!%*?&)" })
    password: string;
}