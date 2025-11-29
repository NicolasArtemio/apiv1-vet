import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse } from '../common/interfaces/authResponse.interface';
import { UsuarioService } from '../usuario/usuario.service';
import { LoginDto } from './dto/create-auth.dto';
import { BcryptHelper } from '../common/helpers/BcrCrypt.hrlper';
import { EmpleadoService } from 'src/empleado/empleado.service';
import { Rol } from 'src/enums/rol.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
    private readonly empleadoService: EmpleadoService,
  ) {}

  async singIn({ email, contrasena }: LoginDto): Promise<AuthResponse> {
    const usuario = await this.usuarioService.findByEmail(email);

    if (!usuario) throw new UnauthorizedException('usuario incorrecto');

    const passwordValido = await BcryptHelper.ComparePassword(
      contrasena,
      usuario.contrasena,
    );
    if (!passwordValido)
      throw new UnauthorizedException('contraseña incorrecta');

    let especialidadAdmin = false;

    if (usuario.rol === Rol.EMPLEADO) {
      const perfil = await this.empleadoService.findOneByUsuarioId(usuario.id);

      // La especialidad 'Admin' es la que otorga permisos de gestión
      if (perfil && perfil.especialidad === 'Admin') {
        especialidadAdmin = true;
      }
    }

    const payload = {
      sub: usuario.id,
      email: usuario.email,
      role: usuario.rol,
      isAdmin: especialidadAdmin, // 👈 AÑADIR BANDERA DE ADMIN (IMPORTANTE PARA EL FRONTEND)
    };

    // 4. Devolver la Respuesta
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: usuario.id,
        email: usuario.email,
        role: usuario.rol,
        isAdmin: especialidadAdmin, // 👈 AÑADIR BANDERA A LA RESPUESTA
      },
    };
  }
}
