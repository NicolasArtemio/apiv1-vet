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
    usuarioId: number;
  }): Promise<Notificacion> {
    try {
      // 1) Crear la entidad
      const notificacion = this.notificacionesRepository.create({
        titulo: params.titulo,
        mensaje: params.mensaje,
        tipo_noti: params.tipo_noti,
        usuario: { id: params.usuarioId },
      });

      // 2) Guardar
      const guardada = await this.notificacionesRepository.save(notificacion);

      // 3) ENVIAR POR WEBSOCKET
      this.gateway.enviarNotificacionAUsuario(
        params.usuarioId.toString(),
        guardada,
      );

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
    usuarioId: number;
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
