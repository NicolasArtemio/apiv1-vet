import * as bcrypt from 'bcrypt';

export class BcryptHelper{
    private static readonly SALTS_ROUNDS = 10;

    static async HashPassword(contrasena:string): Promise<string>{
        return await bcrypt.hash(contrasena, this.SALTS_ROUNDS)
    }

    static async ComparePassword(contrasena: string, hashed: string): Promise<boolean> {
    if (!contrasena || !hashed) {
    throw new Error('contrasena y hash son requeridos para la comparación');
    }
    return await bcrypt.compare(contrasena, hashed);
    }
};