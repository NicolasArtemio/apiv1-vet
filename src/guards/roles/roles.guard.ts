// roles.guard.ts

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../common/decorators/roles.decorator';
import { AuthenticatedRequest } from '../../common/interfaces/authenticatedrequest.interface';
import { Rol } from 'src/enums/rol.enum';
import { EmpleadoService } from 'src/empleado/empleado.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly empleadoService: EmpleadoService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Rol[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Usuario no autenticado');
    }

    const hasRole = requiredRoles.some((role) => user.role === role);

    if (user.role === Rol.EMPLEADO) {
      const empleado = await this.empleadoService.findOneByUsuarioId(user.id);

      if (empleado && empleado.especialidad === 'Admin') {
        console.log(
          `[RolesGuard] Acceso concedido a Empleado (ID ${user.id}) por especialidad 'Admin'`,
        );
        return true; // Acceso concedido para el Admin especial
      }
    }

    // 4. Si no pasó el chequeo de rol estándar y no es el Admin especial, denegar.
    if (!hasRole) {
      throw new ForbiddenException(
        'No tienes permiso para acceder a este recurso',
      );
    }

    // Si pasó el chequeo de rol estándar (hasRole es true) y no era un caso especial.
    return true;
  }
}
