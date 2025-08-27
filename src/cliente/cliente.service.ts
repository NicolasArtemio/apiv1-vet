
import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';

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
      const cliente = this.clienteRepository.create(createClienteDto);
      return await this.clienteRepository.save(cliente);
    } catch (error) {
      console.error('Error al crear el cliente:', error);
      throw new BadRequestException('Error al crear el cliente');
    }
  }

  async findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find();
  }

   async findOne(id: number): Promise<Cliente | null> {
     try {
       const cliente = await this.clienteRepository.findOneBy({ id });
       if (!cliente) {
         throw new NotFoundException('Cliente no encontrado');
       }
       return cliente;
     } catch (error) {
       console.error('Error al buscar el cliente:', error);
       throw new ForbiddenException('Error al buscar el cliente');
     }
   }

  async update(id: number, updateClienteDto: UpdateClienteDto): Promise<Cliente> {
    try {
      await this.clienteRepository.update(id, updateClienteDto);
      const updatedCliente = await this.clienteRepository.findOneBy({ id });
      if (!updatedCliente) {
        throw new NotFoundException('Cliente no encontrado');
      }
      return updatedCliente;
    } catch (error) {
      console.error('Error al actualizar el cliente:', error);
      throw new ForbiddenException('Error al actualizar el cliente');
    }
  }

  async remove(id: number): Promise<Cliente | null> {
    try {
      const cliente = await this.clienteRepository.findOneBy({ id });
      if (!cliente) {
        throw new NotFoundException('Cliente no encontrado');
      }
      await this.clienteRepository.remove(cliente);
      return cliente;
    } catch (error) {
      console.error('Error al eliminar el cliente:', error);
      throw new ForbiddenException('Error al eliminar el cliente');
    }
  }
}