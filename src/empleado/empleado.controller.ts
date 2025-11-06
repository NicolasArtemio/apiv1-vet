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
  NotFoundException,
  ForbiddenException,
  Req,
} from '@nestjs/common';
import { EmpleadoService } from './empleado.service';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { Rol } from 'src/enums/Rol.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthenticatedRequest } from 'src/common/interfaces/authenticatedrequest.interface';

@Controller('empleado')
export class EmpleadoController {
  constructor(private readonly empleadoService: EmpleadoService) {}

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  create(@Body() createEmpleadoDto: CreateEmpleadoDto) {
    return this.empleadoService.create(createEmpleadoDto);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Rol.ADMIN)
  @HttpCode(HttpStatus.OK)
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
    if (user.role === Rol.EMPLEADO && user.id !== empleado.usuario.id) {
      throw new ForbiddenException(
        'Acceso denegado. No eres el propietario de este perfil',
      );
    }
    return empleado;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmpleadoDto: UpdateEmpleadoDto,
  ) {
    return this.empleadoService.update(+id, updateEmpleadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.empleadoService.remove(+id);
  }
}
