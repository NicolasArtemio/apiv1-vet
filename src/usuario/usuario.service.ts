import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  /**
   * Crea un nuevo usuario en la base de datos.
   * @param createUsuarioDto - Datos necesarios para crear el usuario.
   * @returns El usuario creado.
   * @throws BadRequestException si ocurre un error al crear el usuario.
   */

  async create(createUsuarioDto: CreateUsuarioDto) {
    try {
      const usuario = this.usuarioRepository.create(createUsuarioDto);
      return await this.usuarioRepository.save(usuario);
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      throw new BadRequestException('Error al crear el usuario');
    }
  }

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find();
  }

  async findOne(id: number): Promise<Usuario | null> {
    try {
      const usuario = await this.usuarioRepository.findOneBy({ id });
      if (!usuario) {
        throw new NotFoundException('Usuario no encontrado');
      }
      return usuario;
    } catch (error) {
      console.error('Error al buscar el usuario:', error);
      throw new BadRequestException('Error al buscar el usuario');
    }
  }

  async update(
    id: number,
    UpdateUsuarioDto: UpdateUsuarioDto,
  ): Promise<Usuario | null> {
    try {
      const usuario = await this.usuarioRepository.findOneBy({ id });
      if (!usuario) {
        throw new NotFoundException('Usuario no encontrado');
      }
      this.usuarioRepository.merge(usuario, UpdateUsuarioDto);
      return await this.usuarioRepository.save(usuario);
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      throw new BadRequestException('Error al actualizar el usuario');
    }
  }

  async remove(id: number): Promise<Usuario | null> {
    try {
      const usuario = await this.usuarioRepository.findOneBy({ id });
      if (!usuario) {
        throw new NotFoundException('Usuario no encontrado');
      }
      await this.usuarioRepository.remove(usuario);
      return usuario;
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      throw new BadRequestException('Error al eliminar el usuario');
    }
  }
}
