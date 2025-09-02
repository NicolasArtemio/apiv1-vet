import { BadRequestException, ConflictException, ForbiddenException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateMensajeDto } from './dto/create-mensaje.dto';
import { UpdateMensajeDto } from './dto/update-mensaje.dto';
import { Mensaje } from './entities/mensaje.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { promises } from 'dns';



@Injectable()
export class MensajeService {

  constructor(
    @InjectRepository(Mensaje)
    private readonly mensajeRepository: Repository<Mensaje>,
  ) { }
  async createMensaje(createMensajeDto: CreateMensajeDto): Promise<Mensaje> {
    try {
      const mensaje = this.mensajeRepository.create(createMensajeDto)

      return await this.mensajeRepository.save(mensaje);

    } catch (error) {
        
              console.error('Error mientras se crea el mensaje', error);
              if (typeof error === 'object' && error !== null) {
                const err = error as { code?: string; errno?: number };
        
                if (err.code === 'ER_DUP_ENTRY' || err.errno === 1062) {
                  throw new ConflictException(
                    'Ya existe un mensaje con datos duplicados',
                  );
                }
                if (err.code === 'ER_NO_REFERENCED_ROW_2' || err.errno === 1452) {
                  throw new BadRequestException('Datos referenciados no existen');
                }
              }
              throw new InternalServerErrorException('Error al crear mensajes');
            }
        
          }

  async findAll(): Promise<Mensaje[]> {
    return await this.mensajeRepository.find();
  }

  async findOne(id: number): Promise<Mensaje> {
   if (id <= 0) {
      throw new BadRequestException('El ID debe ser un número positivo');
    }
    try {
      const mensaje= await this.mensajeRepository.findOneBy({ id });
      if (!mensaje) {
        throw new HttpException('El mensaje no fue encontrado', HttpStatus.NOT_FOUND);
      }
      return mensaje;
    } catch (error) {
      throw new InternalServerErrorException(`No se encontro el mensaje con el id ${id}`,);
    }
  }
    async update(id: number,UpdateMensajeDto: UpdateMensajeDto,): Promise<Mensaje> {
      if (id <= 0) {
        throw new BadRequestException('El ID debe ser un número positivo');
      }
      try {
        const mensaje = await this.mensajeRepository.findOneBy({ id });
        if (!mensaje) {
          throw new HttpException( 'mensaje no fue encontrado', HttpStatus.BAD_REQUEST, );
        }
        const updateMensaje = Object.assign(mensaje, UpdateMensajeDto);
        return this.mensajeRepository.save(updateMensaje);
      } catch (error) {
        console.error('Error al buscar el mensaje', error);
        throw new InternalServerErrorException(
          `No se encontro el mensaje con el id ${id}`,
        );
      }
    }
  



  async remove(id: number): Promise<Mensaje | null> {
    if (id <= 0) {
      throw new BadRequestException('El ID debe ser un número positivo');
    }
    try {
      const mensaje = await this.mensajeRepository.findOneBy({ id });
      if (!mensaje) {
        throw new HttpException('El mensaje no encontrado', HttpStatus.BAD_REQUEST,);
      }
      return this.mensajeRepository.remove(mensaje);
    } catch (error) {
      throw new InternalServerErrorException(`No se encontro el mensaje con el id ${id}`);
    }
  }
}

