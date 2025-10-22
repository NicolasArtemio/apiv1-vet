/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BadRequestException,
  ConflictException,
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
import { EstadoUsuario } from '../enums/EstadoUsuario.enum';
import { Rol } from '../enums/Rol.enum';
import { UsuarioService } from '../usuario/usuario.service';
import { Usuario } from '../usuario/entities/usuario.entity';
import { BcryptHelper } from '../common/helpers/BcrCrypt.hrlper';

@Injectable()
export class EmpleadoService {
  constructor(
    @InjectRepository(Empleado)
    private empleadoRepository: Repository<Empleado>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private usuarioService: UsuarioService,
  ) {}

  /**
   * Crea un nuevo empleado en la base de datos.
   * @param createEmpleadoDto - Datos necesarios para crear el empleado.
   * @returns El empleado creado.
   * @throws BadRequestException si ocurre un error al crear el empleado.
   */

  async create(createEmpleadoDto: CreateEmpleadoDto): Promise<Empleado> {
    try {
      const dto = createEmpleadoDto;

      if (!dto.email || !dto.contrasena) {
        throw new BadRequestException('email y contraseña son obligatorios');
      }

      const hashedPassword = await BcryptHelper.HashPassword(dto.contrasena);

      // Crear nuevo empleado con la información del DTO
      const nuevoUsuario = await this.usuarioService.create({
        email: dto.email,
        contrasena: hashedPassword,
        rol: Rol.EMPLEADO,
        fecha_registro: new Date(),
        estado: EstadoUsuario.ACTIVO,
      });

      // 2. Crear y guardar el empleado con referencia al usuario
      const nuevoEmpleado = this.empleadoRepository.create({
        ...createEmpleadoDto,
        usuario: nuevoUsuario,
      });

      // Guardar el nuevo empleado en la base de datos
      return await this.empleadoRepository.save(nuevoEmpleado);
    } catch (error) {
      // Manejo de errores
      console.error('Error al crear el empleado:', error);

      // Verificar si el error tiene propiedades relacionadas con la base de datos
      if (error && typeof error === 'object') {
        const err = error as { code?: string; errno?: number };

        // Manejo de error por entrada duplicada (clave duplicada)
        if (err.code === 'ER_DUP_ENTRY' || err.errno === 1062) {
          throw new ConflictException(
            'Ya existe un empleado con datos duplicados',
          );
        }

        // Manejo de error por referencia de datos inexistentes
        if (err.code === 'ER_NO_REFERENCED_ROW_2' || err.errno === 1452) {
          throw new BadRequestException('Datos referenciados no existen');
        }
      }

      // Lanza una excepción genérica si no se captura un error específico
      throw new InternalServerErrorException(
        'Error inesperado al crear el empleado',
      );
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
      const empleado = await this.empleadoRepository.findOne({
        where: { id },
        relations: ['usuario'],
      });
      if (!empleado) {
        throw new NotFoundException('Empleado no encontrado');
      }
      Object.assign(empleado, updateEmpleadoDto);

      if (updateEmpleadoDto.usuario) {
        Object.assign(empleado.usuario, updateEmpleadoDto.usuario);
        await this.usuarioRepository.save(empleado.usuario);
      }
      return this.empleadoRepository.save(empleado);
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
