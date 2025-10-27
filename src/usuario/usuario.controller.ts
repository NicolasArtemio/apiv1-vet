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
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Rol } from 'src/enums/Rol.enum';
import { AuthenticatedRequest } from 'src/common/interfaces/authenticatedrequest.interface';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Rol.ADMIN)
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
  ) {
    const user = req.user;

    if (user.role === Rol.USER && user.id !== +id) {
      throw new ForbiddenException('Access denied');
    }

    return await this.usuarioService.findOne(+id);
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

    return this.usuarioService.remove(id);
  }
}
