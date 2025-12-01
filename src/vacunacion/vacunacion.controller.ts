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
import { VacunacionService } from './vacunacion.service';
import { CreateVacunacionDto } from './dto/create-vacunacion.dto';
import { UpdateVacunacionDto } from './dto/update-vacunacion.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('vacunacion')
export class VacunacionController {
  constructor(private readonly vacunacionService: VacunacionService) {}

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createVacunacionDto: CreateVacunacionDto) {
    return this.vacunacionService.create(createVacunacionDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.vacunacionService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.vacunacionService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updateVacunacionDto: UpdateVacunacionDto,
  ) {
    return this.vacunacionService.update(+id, updateVacunacionDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.vacunacionService.remove(+id);
  }
}
