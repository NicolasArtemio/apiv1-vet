import { Injectable } from '@nestjs/common';
import { CreateMascotaDto } from './dto/create-mascotas.dto';
import { UpdateMascotaDto } from './dto/update-mascotas.dto';

@Injectable()
export class MascotasService {
  create(createMascotaDto: CreateMascotaDto) {
    return 'This action adds a new mascota';
  }

  findAll() {
    return `This action returns all mascotas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mascota`;
  }

  update(id: number, updateMascotaDto: UpdateMascotaDto) {
    return `This action updates a #${id} mascota`;
  }

  remove(id: number) {
    return `This action removes a #${id} mascota`;
  }
}
