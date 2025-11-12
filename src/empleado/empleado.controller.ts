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
  Req,
  NotFoundException,
  ForbiddenException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EmpleadoService } from './empleado.service';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { RolesGuard } from '../guards/roles/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { AuthenticatedRequest } from '../common/interfaces/authenticatedrequest.interface';
import { AuthGuard } from '../guards/uth/auth.guard';
import { Rol } from 'src/enums/rol.enum';

@Controller('empleado')
export class EmpleadoController {
  constructor(private readonly empleadoService: EmpleadoService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Rol.ADMIN)
  create(@Body() createEmpleadoDto: CreateEmpleadoDto) {
    return this.empleadoService.create(createEmpleadoDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Rol.ADMIN)
  findAll() {
    return this.empleadoService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
  ) {
    const user = req.user;

    const empleado = await this.empleadoService.findOne(id);

    if (!empleado) {
      throw new NotFoundException(`Empleado con ID ${id} no encontrado`);
    }

    if (user.role === Rol.ADMIN && user.id !== empleado.usuario.id) {
      throw new ForbiddenException(
        'Acceso denegado. No eres el propietario de este perfil',
      );
    }

    return empleado;
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEmpleadoDto: UpdateEmpleadoDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const user = req.user;

    if (!user) {
      throw new UnauthorizedException(
        'Se requiere autenticacion para modificar el perfil',
      );
    }

    const empleado = await this.empleadoService.findOne(id);

    if (!empleado) {
      throw new NotFoundException(`Empleado con id ${id} no encontrado`);
    }
    if (!empleado.usuario || !empleado.usuario.id) {
      throw new InternalServerErrorException(
        'Error: El perfil del empleado no esta vinculado correctamente',
      );
    }

    if (user.role === Rol.EMPLEADO && user.id !== empleado.usuario.id) {
      throw new ForbiddenException(
        'Acceso denegado. Solo puedes actualizar tu propio perfil de empleado',
      );
    }

    return this.empleadoService.update(id, updateEmpleadoDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Rol.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.empleadoService.remove(id);
  }
}
