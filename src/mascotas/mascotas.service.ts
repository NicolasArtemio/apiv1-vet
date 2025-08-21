import { Injectable } from '@nestjs/common';
import { CreateMascotasDto } from './dto/create-mascotas.dto';
import { UpdateMascotasDto } from './dto/update-mascotas.dto';

@Injectable()
export class MascotasService {
  create(createMascotasDto: CreateMascotasDto) {
    return 'This action adds a new mascota';
  }

  findAll() {
    return `This action returns all mascotas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mascota`;
  }

  update(id: number, updateMascotasDto: UpdateMascotasDto) {
    return `This action updates a #${id} mascota`;
  }

  remove(id: number) {
    return `This action removes a #${id} mascota`;
  }
}
