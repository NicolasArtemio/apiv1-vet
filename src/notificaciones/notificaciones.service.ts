import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateNotificacioneDto } from './dto/create-notificacione.dto';
import { UpdateNotificacioneDto } from './dto/update-notificacione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Notificacion } from './entities/notificacione.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificacionesService {
  constructor(
    @InjectRepository(Notificacion)
    private readonly notificacionesRepository: Repository<Notificacion>,
  ) {}
  async createNotificacion(
    createNotificacioneDto: CreateNotificacioneDto,
  ): Promise<Notificacion> {
    try {
      const notificacion = this.notificacionesRepository.create(
        createNotificacioneDto,
      );
      return await this.notificacionesRepository.save(notificacion);
    } catch (error) {
      console.error('Error mientras se crea la notificacion', error);
      if (typeof error === 'object' && error !== null) {
        const err = error as { code?: string; errno?: number };

        if (err.code === 'ER_DUP_ENTRY' || err.errno === 1062) {
          throw new ConflictException(
            'Ya existe un notificacion con datos duplicados',
          );
        }
        if (err.code === 'ER_NO_REFERENCED_ROW_2' || err.errno === 1452) {
          throw new BadRequestException('Datos referenciados no existen');
        }
      }
      throw new InternalServerErrorException('Error al crear notificaciones');
    }
  }

  async findAll(): Promise<Notificacion[]> {
    return await this.notificacionesRepository.find();
  }

  async findOne(id_notificaciones: number): Promise<Notificacion> {
    if (id_notificaciones <= 0) {
      throw new BadRequestException('El ID debe ser un número positivo');
    }
    try {
      const notificacion = await this.notificacionesRepository.findOneBy({
        id_notificaciones,
      });
      if (!notificacion) {
        throw new HttpException(
          'La notificacion no fue encontrado',
          HttpStatus.NOT_FOUND,
        );
      }
      return notificacion;
    } catch (error) {
      throw new InternalServerErrorException(
        `No se encontro el notificacion con el id ${id_notificaciones}`,
      );
    }
  }

  async update(
    id_notificaciones: number,
    UpdateMensajeDto: UpdateNotificacioneDto,
  ): Promise<Notificacion> {
    if (id_notificaciones <= 0) {
      throw new BadRequestException('El ID debe ser un número positivo');
    }
    try {
      const notificacion = await this.notificacionesRepository.findOneBy({
        id_notificaciones,
      });
      if (!notificacion) {
        throw new HttpException(
          'notificacion no fue encontrado',
          HttpStatus.BAD_REQUEST,
        );
      }
      const updateNotificacion = Object.assign(
        notificacion,
        UpdateNotificacioneDto,
      );
      return this.notificacionesRepository.save(updateNotificacion);
    } catch (error) {
      console.error('Error al buscar el notificacion', error);
      throw new InternalServerErrorException(
        `No se encontro el notificacion con el id ${id_notificaciones}`,
      );
    }
  }

  async remove(id_notificaciones: number): Promise<Notificacion | null> {
    if (id_notificaciones <= 0) {
      throw new BadRequestException('El ID debe ser un número positivo');
    }
    try {
      const notificacion = await this.notificacionesRepository.findOneBy({
        id_notificaciones,
      });
      if (!notificacion) {
        throw new HttpException(
          'Cliente no encontrado',
          HttpStatus.BAD_REQUEST,
        );
      }
      return this.notificacionesRepository.remove(notificacion);
    } catch (error) {
      throw new InternalServerErrorException(
        `No se encontro el cliente con el id ${id_notificaciones}`,
      );
    }
  }
}
