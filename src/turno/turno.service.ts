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

@Injectable()
export class TurnoService {
  constructor(
    @InjectRepository(Turno)
    private readonly turnoRepository: Repository<Turno>,
    private readonly notificacionesService: NotificacionesService,
    @InjectRepository(Mascota)
    private readonly mascotaRepository: Repository<Mascota>,
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

      await this.notificacionesService.createNotificacion({
        titulo: 'Nuevo turno registrado',
        mensaje: `Se creó un turno para la fecha ${nuevoTurno.fecha_turno.toLocaleString()}`,
        tipo_noti: TipoNotificacion.TURNO,
        usuario_id: nuevoTurno.usuario?.id || null,
      });

      return nuevoTurno;
    } catch (error) {
      console.error('Error mientras se crea el turno', error);
      // ...
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
