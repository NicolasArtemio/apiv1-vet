import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { Empleado } from './entities/empleado.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EmpleadoService {
  constructor(
    @InjectRepository(Empleado)
    private empleadoRepository: Repository<Empleado>,
  ) {}

  /**
   * Crea un nuevo empleado en la base de datos.
   * @param createEmpleadoDto - Datos necesarios para crear el empleado.
   * @returns El empleado creado.
   * @throws BadRequestException si ocurre un error al crear el empleado.
   */

  async create(createEmpleadoDto: CreateEmpleadoDto): Promise<Empleado> {
    try {
      const empleado = this.empleadoRepository.create(createEmpleadoDto);
      return await this.empleadoRepository.save(empleado);
    } catch (error) {
      console.error('Error al crear el empleado:', error);
      throw new BadRequestException('Error al crear el empleado');
    }
  }

  async findAll(): Promise<Empleado[]> {
    return this.empleadoRepository.find();
  }

  async findOne(id: number): Promise<Empleado | null> {
    try {
      const empleado = await this.empleadoRepository.findOneBy({ id });
      if (!empleado) {
        throw new NotFoundException('Empleado no encontrado');
      }
      return empleado;
    } catch (error) {
      console.error('Error al buscar el empleado:', error);
      throw new ForbiddenException('Error al buscar el empleado');
    }
  }

  async update(id: number, updateEmpleadoDto: UpdateEmpleadoDto) {
    try {
      await this.empleadoRepository.update(id, updateEmpleadoDto);
      const updateEmpleado = await this.empleadoRepository.findOneBy({ id });
      if (!updateEmpleado) {
        throw new NotFoundException('Empleado no encontrado');
      }
      return updateEmpleado;
    } catch (error) {
      console.error('Error al actualizar el empleado:', error);
      throw new ForbiddenException('Error al actualizar el empleado');
    }
  }

  async remove(id: number): Promise<Empleado | null> {
    try {
      const empleado = await this.empleadoRepository.findOneBy({ id });
      if (!empleado) {
        throw new NotFoundException('Empleado no encontrado');
      }
      await this.empleadoRepository.remove(empleado);
      return empleado;
    } catch (error) {
      console.error('Error al eliminar el empleado:', error);
      throw new ForbiddenException('Error al eliminar el empleado');
    }
  }
}
