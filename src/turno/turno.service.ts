import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateTurnoDto } from './dto/create-turno.dto';
import { UpdateTurnoDto } from './dto/update-turno.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Turno } from './entities/turno.entity';
import { NotificacionesGateway } from 'src/notificaciones/notificaciones.gateway';
import { NotificacionesService } from 'src/notificaciones/notificaciones.service';
import { TipoNotificacion } from 'src/enums/tipo-notificacion.enum';

@Injectable()
export class TurnoService {
  constructor(
    @InjectRepository(Turno)
    private readonly turnoRepository: Repository<Turno>,
    private readonly notificacionesService: NotificacionesService,
    private readonly notificacionesGateway: NotificacionesGateway,
  ) {}

  async create(
    createTurnoDto: CreateTurnoDto,
    usuarioId: number,
  ): Promise<Turno> {
    const turno = this.turnoRepository.create({
      ...createTurnoDto,
      usuario: { id: usuarioId },
    });

    try {
      const turnoCreado = await this.turnoRepository.save(turno);

      const notificacion = await this.notificacionesService.createNotificacion({
        usuario_id: usuarioId,
        titulo: 'Nuevo turno creado',
        mensaje: `Se creó un turno para el día ${turnoCreado.fecha_turno.toISOString().split('T')[0]}`,
        tipo_noti: TipoNotificacion.TURNO,
      });

      this.notificacionesGateway.enviarNotificacionAUsuario(
        String(usuarioId),
        notificacion,
      );

      return turnoCreado;
    } catch (error) {
      console.error('Error al crear el turno', error);
      throw new InternalServerErrorException('Error al crear el turno.');
    }
  }

  async findAll(): Promise<Turno[]> {
    return await this.turnoRepository.find();
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
      console.error('Error al buscar el turno', error);
      throw new InternalServerErrorException(
        `No se encontro el turno con el id ${id_turno}`,
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
      console.error('Error al buscar el turno', error);
      throw new InternalServerErrorException(
        `No se encontro el turno con el id ${id_turno}`,
      );
    }
  }
}
