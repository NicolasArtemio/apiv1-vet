import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTurnoDto } from './dto/create-turno.dto';
import { UpdateTurnoDto } from './dto/update-turno.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Turno } from './entities/turno.entity';
import { NotificacionesService } from 'src/notificaciones/notificaciones.service';
import { TipoNotificacion } from 'src/enums/tipo-notificacion.enum';
import { Mascota } from 'src/mascotas/entities/mascota.entity';
import { EstadoTurno } from 'src/enums/estado-turno.enum';
import { SchedulingService } from 'src/scheduling/scheduling.service';

@Injectable()
export class TurnoService {
  constructor(
    @InjectRepository(Turno)
    private readonly turnoRepository: Repository<Turno>,
    private readonly notificacionesService: NotificacionesService,
    @InjectRepository(Mascota)
    private readonly mascotaRepository: Repository<Mascota>,
    private readonly schedulingService: SchedulingService,
  ) {}
  async create(createTurnoDto: CreateTurnoDto): Promise<Turno> {
    try {
      const { mascota_id, ...restoDatosTurno } = createTurnoDto;

      const mascota = await this.mascotaRepository.findOne({
        where: { id: mascota_id },
        relations: ['cliente'],
      });

      if (!mascota) {
        throw new NotFoundException(
          `Mascota con ID ${mascota_id} no encontrada`,
        );
      }

      const turno = this.turnoRepository.create({
        ...restoDatosTurno,
        mascota: mascota,
        usuario: mascota.cliente,
        estado: EstadoTurno.PENDIENTE,
      });

      const nuevoTurno = await this.turnoRepository.save(turno);
      const usuarioId = nuevoTurno.usuario?.id || null;

      // ===================================
      // 1. Notificación INMEDIATA (Creación)
      // (Guarda en BD y envía WebSocket, gracias a tu createNotificacion)
      // ===================================
      await this.notificacionesService.createNotificacion({
        titulo: 'Nuevo turno registrado',
        mensaje: `Se creó un turno para la mascota ${mascota.nombre} el ${nuevoTurno.fecha_turno.toLocaleString()}`,
        tipo_noti: TipoNotificacion.TURNO,
        usuario_id: usuarioId,
      });

      // ===================================
      // 2. ⏳ Programación del RECORDATORIO (24h antes)
      // ===================================
      const fechaTurno = nuevoTurno.fecha_turno;
      const MILLISECONDS_IN_24_HOURS = 24 * 60 * 60 * 1000;
      const fechaRecordatorio = new Date(
        fechaTurno.getTime() - MILLISECONDS_IN_24_HOURS,
      );

      // Solo programa si el ID del usuario es válido y la fecha del recordatorio es en el futuro
      if (usuarioId && fechaRecordatorio.getTime() > Date.now()) {
        this.schedulingService.scheduleTask(
          `recordatorio-turno-${nuevoTurno.id_turno}`, // ID único para la tarea
          fechaRecordatorio,
          async () => {
            // 👈 ESTA FUNCIÓN SE EJECUTA 24 HORAS ANTES
            await this.notificacionesService.createNotificacion({
              titulo: '⏰ ¡Recordatorio de Turno!',
              mensaje: `¡Hola! Te recordamos tu turno para ${mascota.nombre} mañana a las ${fechaTurno.toLocaleTimeString()}.`,
              tipo_noti: TipoNotificacion.RECORDATORIO,
              usuario_id: usuarioId, // Guarda en BD y envía por WebSocket
            });
          },
        );
      }

      return nuevoTurno;
    } catch (error) {
      console.error('Error mientras se crea el turno', error);

      // ... (Tu lógica de manejo de errores de BD/excepciones)

      throw new InternalServerErrorException('Error al crear turno');
    }
  }
  async findAll(): Promise<Turno[]> {
    return await this.turnoRepository.find({
      relations: ['mascota', 'mascota.cliente'],
    });
  }

  async findOne(id_turno: number): Promise<Turno> {
    if (id_turno <= 0) {
      throw new BadRequestException('El ID debe ser un número positivo');
    }
    try {
      const turno = await this.turnoRepository.findOneBy({ id_turno });
      if (!turno) {
        throw new HttpException(
          'el turno no fue encontrado',
          HttpStatus.NOT_FOUND,
        );
      }
      return turno;
    } catch (error) {
      throw new InternalServerErrorException(
        `No se encontro el turno con el id ${id_turno}`,
        { cause: error },
      );
    }
  }

  async update(
    id_turno: number,
    UpdateTurnoDto: UpdateTurnoDto,
  ): Promise<Turno> {
    if (id_turno <= 0) {
      throw new BadRequestException('El ID debe ser un número positivo');
    }
    try {
      const turno = await this.turnoRepository.findOneBy({ id_turno });
      if (!turno) {
        throw new HttpException(
          'turno no fue encontrado',
          HttpStatus.BAD_REQUEST,
        );
      }
      const updateTurno = Object.assign(turno, UpdateTurnoDto);
      return this.turnoRepository.save(updateTurno);
    } catch (error) {
      console.error('Error al buscar el mensaje', error);
      throw new InternalServerErrorException(
        `No se encontro el turno con el id ${id_turno}`,
      );
    }
  }

  async remove(id_turno: number): Promise<Turno | null> {
    if (id_turno <= 0) {
      throw new BadRequestException('El ID debe ser un número positivo');
    }
    try {
      const turno = await this.turnoRepository.findOneBy({ id_turno });
      if (!turno) {
        throw new HttpException(
          'El turno no encontrado',
          HttpStatus.BAD_REQUEST,
        );
      }
      return this.turnoRepository.remove(turno);
    } catch (error) {
      throw new InternalServerErrorException(
        `No se encontro el turno con el id ${id_turno}`,
        { cause: error },
      );
    }
  }
}
