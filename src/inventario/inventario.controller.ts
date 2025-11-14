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
} from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';
import { AuthGuard } from '../guards/uth/auth.guard';
import { RolesGuard } from '../guards/roles/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Rol } from 'src/enums/rol.enum';

@Controller('inventario')
export class InventarioController {
  constructor(private readonly inventarioService: InventarioService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Rol.EMPLEADO)
  create(@Body() createInventarioDto: CreateInventarioDto) {
    return this.inventarioService.create(createInventarioDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Rol.EMPLEADO)
  findAll() {
    return this.inventarioService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Rol.EMPLEADO)
  findOne(@Param('id') id: string) {
    return this.inventarioService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Rol.EMPLEADO)
  update(
    @Param('id') id: string,
    @Body() updateInventarioDto: UpdateInventarioDto,
  ) {
    return this.inventarioService.update(+id, updateInventarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventarioService.remove(+id);
  }
}
