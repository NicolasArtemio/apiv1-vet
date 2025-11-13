import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
   * Crea un nuevo pago.
   * @param createPagoDto - Datos para crear el pago.
   * @returns El pago creado.
   * @throws ConflictException si ya existe un pago con datos duplicados.
   * @throws BadRequestException si los datos referenciados no existen.
   * @throws InternalServerErrorException si ocurre un error interno al crear el pago.
   */
  async create(createPagoDto: CreatePagoDto): Promise<Pago> {
    try {
      // 1️⃣ Crear el pago
      const pago = this.pagoRepository.create(createPagoDto);
      await this.pagoRepository.save(pago);

      // 2️⃣ Traer el pago completo con relaciones correctamente cargadas
      const pagoCompleto = await this.pagoRepository.findOne({
        where: { id: pago.id },
        relations: ['venta', 'venta.cliente', 'venta.empleado'],
      });

      if (!pagoCompleto) {
        throw new NotFoundException('Pago no encontrado después de crear');
      }

      return pagoCompleto;
    } catch (error: unknown) {
      console.error('Error al crear el pago:', error);

      if (typeof error === 'object' && error !== null) {
        const err = error as { code?: string; errno?: number };

        if (err.code === 'ER_DUP_ENTRY' || err.errno === 1062) {
          throw new ConflictException('Ya existe un pago con datos duplicados');
        }

        if (err.code === 'ER_NO_REFERENCED_ROW_2' || err.errno === 1452) {
          throw new BadRequestException('Datos referenciados no existen');
        }
      }

      throw new InternalServerErrorException('Error interno al crear el pago');
    }
  }

  /**
   * Busca y devuelve todos los pagos.
   * @returns Lista de todos los pagos.
   */
  async findAll(): Promise<Pago[]> {
    return await this.pagoRepository.find();
  }

  /**
   * Busca un pago por su ID.
   * @param id - ID del pago a buscar.
   * @returns El pago encontrado o null si no existe.
   * @throws NotFoundException si el pago no existe.
   * @throws InternalServerErrorException si ocurre un error al buscar el pago.
   */
  async findOne(id: number): Promise<Pago | null> {
    if (id <= 0) {
      throw new BadRequestException('El ID debe ser un número positivo');
    }

    try {
      const pagoCompleto = await this.pagoRepository.findOne({
        where: { id }, // 👈 aquí usamos directamente el id que recibimos
        relations: [
          'venta', // la venta asociada
          'venta.cliente', // cliente de la venta
          'venta.empleado', // empleado de la venta
        ],
      });

      if (!pagoCompleto) {
        throw new NotFoundException(`Pago con ID ${id} no encontrado`);
      }

      return pagoCompleto;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error al buscar el pago:', error);
      throw new InternalServerErrorException('Error interno al buscar el pago');
    }
  }
  /**
   * Actualiza un pago existente.
   * @param id - ID del pago a actualizar.
   * @param updatePagoDto - Datos para actualizar el pago.
   * @returns El pago actualizado.
   * @throws NotFoundException si el pago no existe.
   * @throws InternalServerErrorException si ocurre un error al actualizar el pago.
   */
  async update(id: number, updatePagoDto: UpdatePagoDto): Promise<Pago> {
    if (id <= 0) {
      throw new BadRequestException('El ID debe ser un número positivo');
    }
    try {
      const pago = await this.pagoRepository.findOneBy({ id });
      if (!pago) {
        throw new NotFoundException(`Pago con ID ${id} no encontrado`);
      }
      const updatedPago = Object.assign({}, pago, updatePagoDto);

      return await this.pagoRepository.save(updatedPago);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al actualizar el pago');
    }
  }

  /**
   * Elimina un pago por su ID.
   * @param id - ID del pago a eliminar.
   * @returns El pago eliminado.
   * @throws NotFoundException si el pago no existe.
   * @throws InternalServerErrorException si ocurre un error al eliminar el pago.
   */
  async remove(id: number): Promise<Pago> {
    if (id <= 0) {
      throw new BadRequestException('El ID debe ser un número positivo');
    }
    const pago = await this.pagoRepository.findOneBy({ id });

    if (!pago) {
      throw new NotFoundException(`Pago con ID ${id} no encontrado`);
    }

    try {
      await this.pagoRepository.remove(pago);
      return pago;
    } catch (error) {
      console.error('Error al eliminar el pago:', error);
      throw new InternalServerErrorException('Error al eliminar el pago');
    }
  }
}
