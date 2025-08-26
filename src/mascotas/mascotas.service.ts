import { Injectable } from '@nestjs/common';
import { CreateMascotasDto } from './dto/create-mascotas.dto';
import { UpdateMascotasDto } from './dto/update-mascotas.dto';
import { Mascota } from './entities/mascota.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Turno } from 'src/turno/entities/turno.entity';

@Injectable()
export class MascotasService {
  constructor(
    @InjectRepository(Mascota)
    private readonly mascotaRepository: Repository<Mascota>,
    @InjectRepository(Turno)
     private readonly turnoRepository: Repository<Turno>,


  ){}
  create(createMascotaDto: CreateMascotasDto) {
    return 'This action adds a new mascota';
  }

  findAll() {
    return `This action returns all mascotas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mascota`;
  }

  update(id: number, updateMascotaDto: UpdateMascotasDto) {
    return `This action updates a #${id} mascota`;
  }

  remove(id: number) {
    return `This action removes a #${id} mascota`;
  }
}
