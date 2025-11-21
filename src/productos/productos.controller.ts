import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  ForbiddenException,
  Req,
} from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { RolesGuard } from '../guards/roles/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { AuthGuard } from 'src/guards/uth/auth.guard';
import { Rol } from 'src/enums/rol.enum';
import { AuthenticatedRequest } from 'src/common/interfaces/authenticatedrequest.interface';
import { EmpleadoService } from 'src/empleado/empleado.service';

@Controller('productos')
export class ProductosController {
  constructor(
    private readonly productosService: ProductosService,
    private readonly empleadoService: EmpleadoService,
  ) {}

  private async checkAdminSpecialty(userId: number): Promise<void> {
    const perfilAutenticado =
      await this.empleadoService.findOneByUsuarioId(userId);

    if (!perfilAutenticado || perfilAutenticado.especialidad !== 'Admin') {
      throw new ForbiddenException(
        'Acceso denegado. Solo el Administrador Especial puede gestionar productos.',
      );
    }
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Rol.EMPLEADO)
  async create(
    @Body() createProductoDto: CreateProductoDto,
    @Req() req: AuthenticatedRequest,
  ) {
    await this.checkAdminSpecialty(req.user.id);

    return this.productosService.create(createProductoDto);
  }
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.productosService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.productosService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Rol.EMPLEADO)
  async update(
    @Param('id') id: string,
    @Body() updateProductoDto: UpdateProductoDto,
    @Req() req: AuthenticatedRequest,
  ) {
    await this.checkAdminSpecialty(req.user.id);

    return this.productosService.update(+id, updateProductoDto);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Rol.EMPLEADO)
  async remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    const user = req.user;

    const perfilAutenticado = await this.empleadoService.findOneByUsuarioId(
      user.id,
    );

    if (perfilAutenticado && perfilAutenticado.especialidad === 'Admin') {
      return this.productosService.remove(+id);
    }

    throw new ForbiddenException(
      'Acceso denegado. Solo el Administrador Especial puede eliminar productos.',
    );
  }
}
