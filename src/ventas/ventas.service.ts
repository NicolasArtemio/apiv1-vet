/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Venta } from './entities/venta.entity';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { Cliente } from '../cliente/entities/cliente.entity';
import { Empleado } from '../empleado/entities/empleado.entity';
import { DetalleVenta } from '../detalle_venta/entities/detalle_venta.entity';
import { Repository } from 'typeorm';
import { CreateVentaDto } from './dto/create-venta.dto';
import { Producto } from '../productos/entities/producto.entity';
import { Pago } from '../pago/entities/pago.entity';

@Injectable()
export class VentasService {
  constructor(
    @InjectRepository(Venta)
    private ventaRepository: Repository<Venta>,
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
    @InjectRepository(Empleado)
    private empleadoRepository: Repository<Empleado>,
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
    @InjectRepository(Pago)
    private pagoRepository: Repository<Pago>,
  ) {}

  /**
   * Crea una nueva venta.
   * @param createVentaDto - Datos para crear la venta.
   * @returns La venta creada.
   * @throws ConflictException si ya existe una venta con datos duplicados.
   * @throws BadRequestException si los datos referenciados no existen.
   * @throws InternalServerErrorException si ocurre un error interno al crear la venta.
   */

  async create(createVentaDto: CreateVentaDto): Promise<Venta> {
    try {
      // 0️⃣ Validar que haya al menos un detalle
      if (!createVentaDto.detalles || createVentaDto.detalles.length === 0) {
        throw new BadRequestException(
          'La venta debe tener al menos un detalle',
        );
      }

      // 1️⃣ Buscar cliente y empleado
      const cliente = await this.clienteRepository.findOneBy({
        id: createVentaDto.id_cliente,
      });
      if (!cliente) throw new NotFoundException('Cliente no encontrado');

      const empleado = await this.empleadoRepository.findOneBy({
        id: createVentaDto.id_empleado,
      });
      if (!empleado) throw new NotFoundException('Empleado no encontrado');

      // 2️⃣ Transformar fecha
      const fecha = new Date(createVentaDto.fecha);

      // 3️⃣ Crear detalles y calcular total
      const detalles: DetalleVenta[] = [];
      let total = 0;

      for (const d of createVentaDto.detalles) {
        const producto = await this.productoRepository.findOneBy({
          id: d.id_producto,
        });
        if (!producto)
          throw new NotFoundException(
            `Producto con id ${d.id_producto} no encontrado`,
          );

        const detalle = new DetalleVenta();
        detalle.producto = producto;
        detalle.cantidad = d.cantidad;
        detalle.precio = producto.precio; // snapshot
        detalle.subtotal = producto.precio * d.cantidad;

        total += detalle.subtotal;
        detalles.push(detalle);

        // 3️⃣a. Opcional: descontar stock
        // producto.stock -= d.cantidad;
        // await this.productoRepository.save(producto);
      }

      // 4️⃣ Crear la venta
      const venta = this.ventaRepository.create({
        cliente,
        empleado,
        fecha,
        total,
        detalles,
        metodo_pago: createVentaDto.metodo_pago,
        estado_pago: createVentaDto.estado_pago,
      });

      // 5️⃣ Guardar
      const ventaGuardada = await this.ventaRepository.save(venta);

      // 6️⃣ Opcional: crear un pago inicial
      const pago = this.pagoRepository.create({
        venta: ventaGuardada,
        fecha_pago: new Date(),
        monto_pago: ventaGuardada.total,
        metodo_pago: createVentaDto.metodo_pago,
        estado_pago: createVentaDto.estado_pago,
      });
      await this.pagoRepository.save(pago);

      return ventaGuardada;
    } catch (error) {
      console.error('Error al crear la venta:', error);
      throw error;
    }
  }
  /**
   * Busca y devuelve todas las ventas.
   * @returns Lista de todas las ventas.
   */
  async findAll(): Promise<Venta[]> {
    return this.ventaRepository.find();
  }

  /**
   * Busca y devuelve una venta por su ID.
   * @param id - ID de la venta a buscar.
   * @returns La venta encontrada.
   * @throws NotFoundException si la venta no es encontrada.
   * @throws InternalServerErrorException si ocurre un error interno al buscar la venta.
   */
  async findOne(id: number): Promise<Venta> {
    if (id <= 0) {
      throw new BadRequestException('El ID debe ser un número positivo');
    }

    try {
      const venta = await this.ventaRepository.findOne({
        where: { id_compra: id },
      });

      if (!venta) {
        throw new NotFoundException(`Venta con ID ${id} no encontrada`);
      }

      return venta;
    } catch (error) {
      console.error('Error al buscar la venta:', error);
      throw new InternalServerErrorException(
        'Error interno al buscar la venta',
      );
    }
  }

  /**
   * Actualiza una venta existente.
   * @param id - ID de la venta a actualizar.
   * @param updateVentaDto - Datos para actualizar la venta.
   * @returns La venta actualizada.
   * @throws NotFoundException si la venta no es encontrada.
   * @throws InternalServerErrorException si ocurre un error interno al actualizar la venta.
   */
  async update(id: number, updateVentaDto: UpdateVentaDto): Promise<Venta> {
    if (id <= 0) {
      throw new BadRequestException('El ID debe ser un número positivo');
    }
    try {
      const venta = await this.ventaRepository.findOneBy({ id_compra: id });

      if (!venta) {
        throw new NotFoundException(`Venta con ID ${id} no encontrada`);
      }

      Object.assign(venta, updateVentaDto);
      return await this.ventaRepository.save(venta);
    } catch (error) {
      console.error('Error al actualizar la venta:', error);
      throw new InternalServerErrorException(
        'Error interno al actualizar la venta',
      );
    }
  }

  /**
   * Elimina una venta por su ID.
   * @param id - ID de la venta a eliminar.
   * @returns La venta eliminada.
   * @throws BadRequestException si el ID no es un número positivo.
   * @throws NotFoundException si la venta no es encontrada.
   * @throws InternalServerErrorException si ocurre un error interno al eliminar la venta.
   */
  async remove(id: number): Promise<Venta> {
    if (id <= 0) {
      throw new BadRequestException('El ID debe ser un número positivo');
    }

    try {
      const venta = await this.ventaRepository.findOneBy({ id_compra: id });

      if (!venta) {
        throw new NotFoundException(`Venta con ID ${id} no encontrada`);
      }

      await this.ventaRepository.remove(venta);
      return venta;
    } catch (error) {
      console.error('Error al eliminar la venta:', error);
      throw new InternalServerErrorException(
        'Error interno al eliminar la venta',
      );
    }
  }
}
