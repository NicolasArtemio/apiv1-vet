import {
  // ... todos tus imports ...
  UseGuards,
  ParseIntPipe,
  ForbiddenException,
  Req,
  NotFoundException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { AuthenticatedRequest } from '../common/interfaces/authenticatedrequest.interface';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { AuthGuard } from '../guards/uth/auth.guard';
import { RolesGuard } from '../guards/roles/roles.guard';
import { Rol } from 'src/enums/rol.enum';
import { EmpleadoService } from 'src/empleado/empleado.service';

@Controller('cliente')
export class ClienteController {
  constructor(
    private readonly clienteService: ClienteService,
    private readonly empleadoService: EmpleadoService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clienteService.create(createClienteDto);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Roles(Rol.EMPLEADO)
  async findAll(@Req() req: AuthenticatedRequest) {
    const user = req.user;

    let isSpecialAdmin = false;

    const perfilAutenticado = await this.empleadoService.findOneByUsuarioId(
      user.id,
    );

    if (perfilAutenticado && perfilAutenticado.especialidad === 'Admin') {
      isSpecialAdmin = true;
    }

    if (isSpecialAdmin) {
      return this.clienteService.findAll();
    }

    if (!perfilAutenticado) {
      throw new InternalServerErrorException(
        'Error de seguridad: Usuario autenticado no tiene perfil de empleado asociado.',
      );
    }

    throw new ForbiddenException(
      'Acceso denegado. Solo el Administrador Especial puede ver la lista completa de clientes.',
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
    const cliente = await this.clienteService.findOne(id);

    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado.`);
    }

    let isSpecialAdmin = false;

    if (user.role === Rol.EMPLEADO) {
      const perfilAutenticado = await this.empleadoService.findOneByUsuarioId(
        user.id,
      );

      if (perfilAutenticado && perfilAutenticado.especialidad === 'Admin') {
        isSpecialAdmin = true;
      }
    }

    if (
      user.role === Rol.USER &&
      user.id !== cliente.usuario.id &&
      !isSpecialAdmin
    ) {
      throw new ForbiddenException(
        'Acceso denegado. No eres el propietario de este perfil ni un administrador.',
      );
    }

    return cliente;
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClienteDto: UpdateClienteDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const user = req.user;

    const cliente = await this.clienteService.findOne(id);

    let isSpecialAdmin = false;
    if (user.role === Rol.EMPLEADO) {
      const perfilAutenticado = await this.empleadoService.findOneByUsuarioId(
        user.id,
      );

      if (perfilAutenticado && perfilAutenticado.especialidad === 'Admin') {
        isSpecialAdmin = true;
      }
    }

    if (
      user.role === Rol.USER &&
      user.id !== cliente.usuario.id &&
      !isSpecialAdmin
    ) {
      throw new ForbiddenException(
        'Acceso denegado. Solo puedes actualizar tu propio perfil de cliente o eres un administrador.',
      );
    }

    return this.clienteService.update(id, updateClienteDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Rol.EMPLEADO)
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
  ) {
    const user = req.user;

    const perfilAutenticado = await this.empleadoService.findOneByUsuarioId(
      user.id,
    );

    if (perfilAutenticado && perfilAutenticado.especialidad === 'Admin') {
      return this.clienteService.remove(id);
    }

    throw new ForbiddenException(
      'Acceso denegado. Solo el Administrador Especial puede eliminar perfiles de cliente.',
    );
  }
}
