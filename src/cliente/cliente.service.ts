import {
  BadRequestException,
  ConflictException,
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
import { Rol } from '../enums/Rol.enum';
import { EstadoUsuario } from '../enums/EstadoUsuario.enum';
import { UsuarioService } from '../usuario/usuario.service';
import { Usuario } from '../usuario/entities/usuario.entity';
import { BcryptHelper } from '../common/helpers/BcrCrypt.hrlper';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private usuarioService: UsuarioService,
  ) {}

  /**
   * Crea un nuevo cliente en la base de datos.
   * @param createClienteDto - Datos necesarios para crear el cliente.
   * @returns El cliente creado.
   * @throws BadRequestException si ocurre un error al crear el cliente.
   * @throws ConflictException si ya existe un cliente con datos duplicados.
   * @throws InternalServerErrorException si ocurre un error inesperado.
   */

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    try {
      if (!createClienteDto.email || !createClienteDto.contrasena) {
        throw new BadRequestException('email y contraseña son obligatorios');
      }

      const hashedPassword = await BcryptHelper.HashPassword(
        createClienteDto.contrasena,
      );

      // 1. Crear y guardar el usuario
      const nuevoUsuario = await this.usuarioService.create({
        email: createClienteDto.email,
        contrasena: hashedPassword,
        rol: Rol.USER,
        fecha_registro: new Date(),
        estado: EstadoUsuario.ACTIVO,
      });

      // 2. Crear y guardar el cliente con referencia al usuario
      const nuevoCliente = this.clienteRepository.create({
        ...createClienteDto,
        usuario: nuevoUsuario,
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

  async findOne(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOne({
      where: { id },
      // ¡ESTO ES LA CLAVE! Sin esto, cliente.usuario será undefined o un proxy vacío.
      relations: ['usuario'],
    });

    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado.`);
    }

    return cliente;
  }
  async update(
    id: number,
    updateClienteDto: UpdateClienteDto,
  ): Promise<Cliente> {
    try {
      const cliente = await this.clienteRepository.findOne({
        where: { id },
        relations: ['usuario'],
      });

      if (!cliente) {
        throw new NotFoundException('Cliente no encontrado');
      }

      // Actualizar campos del cliente
      Object.assign(cliente, updateClienteDto);

      // Actualizar datos del usuario relacionado (si vienen)
      if (updateClienteDto.usuario && cliente.usuario) {
        Object.assign(cliente.usuario, updateClienteDto.usuario);
        await this.usuarioRepository.save(cliente.usuario);
      }

      return await this.clienteRepository.save(cliente);
    } catch (error) {
      console.error('Error al actualizar el cliente:', error);

      const err = error as { code?: string; errno?: number };

      if (err.code === 'ER_DUP_ENTRY' || err.errno === 1062) {
        throw new ConflictException('Datos duplicados: el email ya existe');
      }

      throw new InternalServerErrorException(
        'Error interno al actualizar el cliente',
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
