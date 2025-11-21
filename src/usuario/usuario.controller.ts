import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  ParseIntPipe,
  ForbiddenException,
  Req,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { RolesGuard } from '../guards/roles/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { AuthenticatedRequest } from '../common/interfaces/authenticatedrequest.interface';
import { AuthGuard } from '../guards/uth/auth.guard';
import { Rol } from 'src/enums/rol.enum';
import { EmpleadoService } from 'src/empleado/empleado.service';

@Controller('usuarios')
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly empleadoService: EmpleadoService,
  ) {}

  private async isSpecialAdmin(userId: number): Promise<boolean> {
    if (userId === undefined) return false;
    const perfilAutenticado =
      await this.empleadoService.findOneByUsuarioId(userId);
    return perfilAutenticado?.especialidad === 'Admin';
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Rol.EMPLEADO)
  @HttpCode(HttpStatus.OK)
  async findAll(@Req() req: AuthenticatedRequest) {
    if (await this.isSpecialAdmin(req.user.id)) {
      return this.usuarioService.findAll();
    }

    throw new ForbiddenException(
      'Acceso denegado. Solo el Administrador Especial puede ver todos los usuarios.',
    );
  }
  @Get(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
  ) {
    const user = req.user;

    if (user.role === Rol.USER && user.id !== id) {
      throw new ForbiddenException('Access denied');
    }

    if (user.role === Rol.EMPLEADO && user.id !== id) {
      if (!(await this.isSpecialAdmin(user.id))) {
        throw new ForbiddenException(
          'Acceso denegado. Solo puedes ver tu propio perfil o eres un Administrador Especial.',
        );
      }
    }

    return await this.usuarioService.findOne(id);
  }
  @Patch(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const user = req.user;

    if (user.role === Rol.USER && user.id !== id) {
      throw new ForbiddenException(
        'Acceso denegado. Solo puedes actualizar tu propia cuenta de usuario.',
      );
    }

    if (user.role === Rol.EMPLEADO && user.id !== id) {
      if (!(await this.isSpecialAdmin(user.id))) {
        throw new ForbiddenException(
          'Acceso denegado. Solo puedes actualizar tu propia cuenta o eres un Administrador Especial.',
        );
      }
    }

    return this.usuarioService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
  ) {
    const user = req.user;

    if (user.role === Rol.USER && user.id !== id) {
      throw new ForbiddenException(
        'Acceso denegado. Solo puedes desactivar tu propia cuenta.',
      );
    }

    if (user.role === Rol.EMPLEADO && user.id !== id) {
      if (!(await this.isSpecialAdmin(user.id))) {
        throw new ForbiddenException(
          'Acceso denegado. Solo puedes desactivar tu propia cuenta o eres un Administrador Especial.',
        );
      }
    }

    return this.usuarioService.remove(id);
  }
}
