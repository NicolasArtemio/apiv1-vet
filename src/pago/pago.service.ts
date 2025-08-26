import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pago } from './entities/pago.entity';

@Injectable()
export class PagoService {
  constructor(
    @InjectRepository(Pago)
    private readonly pagoRepository: Repository<Pago>,
  ) {}

  /**
   * Crea un nuevo pago en la base de datos.
   * @param createPagoDto - Datos necesarios para crear el pago.
   * @returns El pago creado.
   * @throws BadRequestException si ocurre un error al crear el pago.
   */

  async create(createPagoDto: CreatePagoDto): Promise<Pago> {
    try {
      const pago = this.pagoRepository.create(createPagoDto);
      return await this.pagoRepository.save(pago);
    } catch (error) {
      console.error('Error al crear el pago:', error);
      throw new BadRequestException('Error al crear el pago');
    }
  }

  async findAll(): Promise<Pago[]> {
    return this.pagoRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} pago`;
  }

  update(id: number, updatePagoDto: UpdatePagoDto) {
    return `This action updates a #${id} pago`;
  }

  remove(id: number) {
    return `This action removes a #${id} pago`;
  }
}
