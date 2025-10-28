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
  UnauthorizedException,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Rol } from 'src/enums/Rol.enum';
import { AuthenticatedRequest } from 'src/common/interfaces/authenticatedrequest.interface';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clienteService.create(createClienteDto);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Rol.ADMIN)
  findAll() {
    return this.clienteService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
  ) {
    const user = req.user;

    const cliente = await this.clienteService.findOne(id);

    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado.`);
    }

    if (user.role === Rol.USER && user.id !== cliente.usuario.id) {
      throw new ForbiddenException(
        'Acceso denegado. No eres el propietario de este perfil.',
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

    if (!user) {
      throw new UnauthorizedException(
        'Se requiere autenticación para modificar el perfil.',
      );
    }

    const cliente = await this.clienteService.findOne(id);

    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado.`);
    }

    if (!cliente.usuario || !cliente.usuario.id) {
      throw new InternalServerErrorException(
        'Error: El perfil de cliente no está vinculado correctamente.',
      );
    }

    if (user.role === Rol.USER && user.id !== cliente.usuario.id) {
      throw new ForbiddenException(
        'Acceso denegado. Solo puedes actualizar tu propio perfil de cliente.',
      );
    }

    return this.clienteService.update(id, updateClienteDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Rol.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.clienteService.remove(id);
  }
}
