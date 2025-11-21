import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { VentasService } from './ventas.service';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { AuthGuard } from '../guards/uth/auth.guard';
import { RolesGuard } from '../guards/roles/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { AuthenticatedRequest } from '../common/interfaces/authenticatedrequest.interface';
import { Rol } from 'src/enums/rol.enum';
import { EmpleadoService } from 'src/empleado/empleado.service';

@Controller('ventas')
export class VentasController {
  constructor(
    private readonly ventasService: VentasService,
    private readonly empleadoService: EmpleadoService,
  ) {}

  private async isSpecialAdmin(userId: number): Promise<boolean> {
    if (userId === undefined) return false;
    const perfilAutenticado =
      await this.empleadoService.findOneByUsuarioId(userId);
    return perfilAutenticado?.especialidad === 'Admin';
  }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Rol.EMPLEADO)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createVentaDto: CreateVentaDto) {
    return this.ventasService.create(createVentaDto);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Rol.EMPLEADO)
  @HttpCode(HttpStatus.OK)
  async findAll(@Req() req: AuthenticatedRequest) {
    if (await this.isSpecialAdmin(req.user.id)) {
      return this.ventasService.findAll();
    }

    throw new ForbiddenException(
      'Acceso denegado. Solo el Administrador Especial puede ver todas las ventas.',
    );
  }

  @Get(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Rol.EMPLEADO)
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
  ) {
    if (await this.isSpecialAdmin(req.user.id)) {
      return this.ventasService.findOne(id);
    }

    throw new ForbiddenException(
      'Acceso denegado. Solo el Administrador Especial puede ver esta venta.',
    );
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Rol.EMPLEADO)
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVentaDto: UpdateVentaDto,
    @Req() req: AuthenticatedRequest,
  ) {
    if (!(await this.isSpecialAdmin(req.user.id))) {
      throw new ForbiddenException(
        'Acceso denegado. Solo el Administrador Especial puede actualizar ventas.',
      );
    }

    return this.ventasService.update(id, updateVentaDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Rol.EMPLEADO)
  @HttpCode(HttpStatus.OK)
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
  ) {
    if (!(await this.isSpecialAdmin(req.user.id))) {
      throw new ForbiddenException(
        'Acceso denegado. Solo el Administrador Especial puede eliminar ventas.',
      );
    }

    return this.ventasService.remove(id);
  }
}
