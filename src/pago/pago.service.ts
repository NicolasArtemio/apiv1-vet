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
    return await this.pagoRepository.find();
  }

  async findOne(id: number): Promise<Pago | null> {
    try {
      const pago = await this.pagoRepository.findOneBy({ id });
      if (!Pago) {
        throw new BadRequestException('Pago no encontrado');
      } else {
        return pago;
      }
    } catch (error) {
      console.error('Error al buscar el pago:', error);
      throw new BadRequestException('Error al buscar el pago');
    }
  }

  async update(id: number, updatePagoDto: UpdatePagoDto): Promise<Pago> {
    const pago = await this.pagoRepository.findOneBy({ id });
    if (!pago) {
      throw new BadRequestException('Pago no encontrado');
    }
    const updatedPago = Object.assign({}, pago, updatePagoDto);

    return await this.pagoRepository.save(updatedPago);
  }

  async remove(id: number): Promise<Pago> {
    const pago = await this.findOne(id);
    if (!pago) {
      throw new BadRequestException('Pago no encontrado');
    }
    return await this.pagoRepository.remove(pago);
  }
}
