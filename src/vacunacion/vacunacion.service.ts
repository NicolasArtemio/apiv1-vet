import { Injectable } from '@nestjs/common';
import { CreateVacunacionDto } from './dto/create-vacunacion.dto';
import { UpdateVacunacionDto } from './dto/update-vacunacion.dto';

@Injectable()
export class VacunacionService {
  create(createVacunacionDto: CreateVacunacionDto) {
    return 'This action adds a new vacunacion';
  }

  findAll() {
    return `This action returns all vacunacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vacunacion`;
  }

  update(id: number, updateVacunacionDto: UpdateVacunacionDto) {
    return `This action updates a #${id} vacunacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} vacunacion`;
  }
}
