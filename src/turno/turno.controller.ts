import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { TurnoService } from './turno.service';
import { CreateTurnoDto } from './dto/create-turno.dto';
import { UpdateTurnoDto } from './dto/update-turno.dto';
import { AuthResponse } from 'src/common/interfaces/authResponse.interface';

@Controller('turno')
export class TurnoController {
  constructor(private readonly turnoService: TurnoService) {}
  @Post()
  create(@Body() createTurnoDto: CreateTurnoDto, @Req() req: AuthResponse) {
    const usuarioId = req.user.id;
    return this.turnoService.create(createTurnoDto, usuarioId);
  }
  @Get()
  findAll() {
    return this.turnoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.turnoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTurnoDto: UpdateTurnoDto) {
    return this.turnoService.update(+id, updateTurnoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.turnoService.remove(+id);
  }
}
