/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { Empleado } from './entities/empleado.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { EstadoUsuario } from 'src/enums/EstadoUsuario.enum';
import { Rol } from 'src/enums/Rol.enum';

@Injectable()
export class EmpleadoService {
  constructor(
    @InjectRepository(Empleado)
    private empleadoRepository: Repository<Empleado>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  /**
   * Crea un nuevo empleado en la base de datos.
   * @param createEmpleadoDto - Datos necesarios para crear el empleado.
   * @returns El empleado creado.
   * @throws BadRequestException si ocurre un error al crear el empleado.
   */

  async create(createEmpleadoDto: CreateEmpleadoDto): Promise<Empleado> {
    try {
      const nuevoEmpleado = this.empleadoRepository.create({
        ...createEmpleadoDto,
        rol: Rol.EMPLEADO,
        fecha_registro: new Date(),
        estado: EstadoUsuario.ACTIVO,
      });

      return await this.empleadoRepository.save(nuevoEmpleado);
    } catch (error) {
      console.error('Error al crear el empleado:', error);

      if (typeof error === 'object' && error !== null) {
        const err = error as { code?: string; errno?: number };

        if (err.code === 'ER_DUP_ENTRY' || err.errno === 1062) {
          throw new ConflictException(
            'Ya existe un empleado con datos duplicados',
          );
        }

        if (err.code === 'ER_NO_REFERENCED_ROW_2' || err.errno === 1452) {
          throw new BadRequestException('Datos referenciados no existen');
        }
      }

      throw new BadRequestException('Error al crear el empleado');
    }
  }

  async findAll(): Promise<Empleado[]> {
    return this.empleadoRepository.find();
  }

  async findOne(id: number): Promise<Empleado | null> {
    if (id <= 0) {
      throw new BadRequestException('El ID debe ser un número positivo');
    }
    try {
      const empleado = await this.empleadoRepository.findOneBy({ id });
      if (!empleado) {
        throw new HttpException('Cliente no encontrado', HttpStatus.NOT_FOUND);
      }
      return empleado;
    } catch (error) {
      console.error('Error al buscar el empleado:', error);
      throw new InternalServerErrorException(
        `No se encontro el empleado con el id ${id}`,
      );
    }
  }

  async update(id: number, updateEmpleadoDto: UpdateEmpleadoDto) {
    if (id <= 0) {
      throw new BadRequestException('El ID debe ser un número positivo');
    }

    try {
      const empleado = await this.empleadoRepository.findOneBy({ id });
      if (!empleado) {
        throw new HttpException(
          'Cliente no encontrado',
          HttpStatus.BAD_REQUEST,
        );
      }
      const updateEmpleado = Object.assign(empleado, updateEmpleadoDto);
      return await this.empleadoRepository.save(updateEmpleado);
    } catch (error) {
      console.error('Error al actualizar el empleado:', error);
      throw new InternalServerErrorException(
        `No se encontro el cliente con el id ${id}`,
      );
    }
  }

  async remove(id: number): Promise<Empleado | null> {
    if (id <= 0) {
      throw new BadRequestException('El ID debe ser un número positivo');
    }
    try {
      const empleado = await this.empleadoRepository.findOneBy({ id });
      if (!empleado) {
        throw new HttpException(
          'Cliente no encontrado',
          HttpStatus.BAD_REQUEST,
        );
      }
      return this.empleadoRepository.remove(empleado);
    } catch (error) {
      console.error('Error al eliminar el empleado:', error);
      throw new InternalServerErrorException(
        `No se encontro el cliente con el id ${id}`,
      );
    }
  }
}
