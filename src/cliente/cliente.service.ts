/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';
import { Rol } from 'src/enums/Rol.enum';
import { EstadoUsuario } from 'src/enums/EstadoUsuario.enum';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  /**
   * Crea un nuevo cliente en la base de datos.
   * @param createClienteDto - Datos necesarios para crear el cliente.
   * @returns El cliente creado.
   * @throws BadRequestException si ocurre un error al crear el cliente.
   */
  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    try {
      const nuevoCliente = this.clienteRepository.create({
        ...createClienteDto,
        rol: Rol.USER,
        fecha_registro: new Date(),
        estado: EstadoUsuario.ACTIVO,
      });

      return await this.clienteRepository.save(nuevoCliente);
    } catch (error) {
      console.error('Error al crear el cliente:', error);

      const err = error as { code?: string; errno?: number };

      if (err.code === 'ER_DUP_ENTRY' || err.errno === 1062) {
        throw new ConflictException(
          'Ya existe un cliente con datos duplicados',
        );
      }

      if (err.code === 'ER_NO_REFERENCED_ROW_2' || err.errno === 1452) {
        throw new BadRequestException('Datos referenciados no existen');
      }

      throw new InternalServerErrorException('Error al crear cliente');
    }
  }
  async findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find();
  }

  async findOne(id: number): Promise<Cliente | null> {
    if (id <= 0) {
      throw new BadRequestException('El ID debe ser un número positivo');
    }
    try {
      const cliente = await this.clienteRepository.findOneBy({ id });
      if (!cliente) {
        throw new HttpException('Cliente no encontrado', HttpStatus.NOT_FOUND);
      }
      return cliente;
    } catch (error) {
      console.error('Error al buscar el cliente:', error);
      throw new InternalServerErrorException(
        `No se encontro el cliente con el id ${id}`,
      );
    }
  }

  async update(
    id: number,
    updateClienteDto: UpdateClienteDto,
  ): Promise<Cliente> {
    if (id <= 0) {
      throw new BadRequestException('El ID debe ser un número positivo');
    }
    try {
      const cliente = await this.clienteRepository.findOneBy({ id });
      if (!cliente) {
        throw new HttpException(
          'Cliente no encontrado',
          HttpStatus.BAD_REQUEST,
        );
      }
      const updateCliente = Object.assign(cliente, updateClienteDto);
      return this.clienteRepository.save(updateCliente);
    } catch (error) {
      console.error('Error al buscar el cliente', error);
      throw new InternalServerErrorException(
        `No se encontro el cliente con el id ${id}`,
      );
    }
  }

  async remove(id: number): Promise<Cliente | null> {
    if (id <= 0) {
      throw new BadRequestException('El ID debe ser un número positivo');
    }
    try {
      const cliente = await this.clienteRepository.findOneBy({ id });
      if (!cliente) {
        throw new HttpException(
          'Cliente no encontrado',
          HttpStatus.BAD_REQUEST,
        );
      }
      return this.clienteRepository.remove(cliente);
    } catch (error) {
      console.error('Error al eliminar el cliente:', error);
      throw new InternalServerErrorException(
        `No se encontro el cliente con el id ${id}`,
      );
    }
  }
}
