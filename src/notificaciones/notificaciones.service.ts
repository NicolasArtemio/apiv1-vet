import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notificacion } from './entities/notificacione.entity';
import { Repository } from 'typeorm';
import { TipoNotificacion } from 'src/enums/tipo-notificacion.enum';
import { NotificacionesGateway } from './notificaciones.gateway';

@Injectable()
export class NotificacionesService {
  constructor(
    @InjectRepository(Notificacion)
    private readonly notificacionesRepository: Repository<Notificacion>,
    private readonly gateway: NotificacionesGateway,
  ) {}

  async createNotificacion(params: {
    titulo: string;
    mensaje: string;
    tipo_noti: TipoNotificacion;
    usuario_id: number | null;
  }): Promise<Notificacion> {
    try {
      const usuarioRelacion = params.usuario_id
        ? { id: params.usuario_id }
        : null;

      // 2) Crear la entidad
      const notificacion = this.notificacionesRepository.create({
        titulo: params.titulo,
        mensaje: params.mensaje,
        tipo_noti: params.tipo_noti,
        usuario: usuarioRelacion,
      });

      // 3) Guardar
      const guardada = await this.notificacionesRepository.save(notificacion);

      if (params.usuario_id) {
        this.gateway.enviarNotificacionAUsuario(
          String(params.usuario_id),
          guardada,
        );
      }

      return guardada;
    } catch (error) {
      console.error('Error mientras se crea la notificación', error);
      throw new InternalServerErrorException('Error al crear notificaciones');
    }
  }

  async crearNotificacionVenta(params: {
    titulo: string;
    mensaje: string;
    tipo_noti: TipoNotificacion;
    usuario_id: number | null;
  }) {
    return this.createNotificacion(params);
  }

  async findAll(): Promise<Notificacion[]> {
    return await this.notificacionesRepository.find();
  }

  async findOne(id: number): Promise<Notificacion> {
    if (id <= 0) {
      throw new BadRequestException('El ID debe ser un número positivo');
    }

    const notificacion = await this.notificacionesRepository.findOneBy({
      id_notificaciones: id,
    });

    if (!notificacion) {
      throw new NotFoundException('Notificación no encontrada');
    }

    return notificacion;
  }

  async remove(id: number): Promise<Notificacion | null> {
    if (id <= 0) {
      throw new BadRequestException('El ID debe ser positivo');
    }

    const notificacion = await this.notificacionesRepository.findOneBy({
      id_notificaciones: id,
    });

    if (!notificacion) {
      throw new NotFoundException('Notificación no encontrada');
    }

    return this.notificacionesRepository.remove(notificacion);
  }
}
