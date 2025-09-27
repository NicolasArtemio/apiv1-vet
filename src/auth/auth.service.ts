import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse } from 'src/common/interfaces/authResponse.interface';
import { UsuarioService } from 'src/usuario/usuario.service';
import { LoginDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async singIn({ email, contrasena }: LoginDto): Promise<AuthResponse> {
    const usuario = await this.usuarioService.findByEmail(email);

    if (!usuario) throw new UnauthorizedException('usuario incorrecto');

    const passwordValido = await this.usuarioService.findByPassword(contrasena);
    if (!passwordValido)
      throw new UnauthorizedException('contraseña incorrecta');

    const payload = {
      sub: usuario.id,
      email: usuario.email,
      role: usuario.rol,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        email: usuario.email,
        role: usuario.rol,
      },
    };
  }
}
