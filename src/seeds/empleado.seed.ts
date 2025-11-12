import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEmpleadoDto } from '../empleado/dto/create-empleado.dto';
import { BcryptHelper } from '../common/helpers/BcrCrypt.hrlper';
import { UsuarioService } from '../usuario/usuario.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empleado } from '../empleado/entities/empleado.entity';
import { EstadoUsuario } from 'src/enums/estado-usuario.enum';
import { Rol } from 'src/enums/rol.enum';

@Injectable()
export class AdminSeed {
  constructor(
    private readonly usuarioService: UsuarioService,
    @InjectRepository(Empleado)
    private readonly empleadoRepository: Repository<Empleado>,
  ) {}

  async run(): Promise<void> {
    console.log('🌱 Seed de admin iniciado...');

    const createEmpleadoDto: CreateEmpleadoDto = {
      nombre: 'Administrador',
      apellido: 'Principal',
      email: 'admin@example.com',
      contrasena: 'admin123',
      telefono: '1111111111',
      direccion: 'Av. Central 1',
      fecha_nacimiento: new Date('1990-01-01'),
      dni: 12345678,
      ciudad: 'Ciudad Central',
      especialidad: 'Administración',
    };

    const dto = createEmpleadoDto;

    if (!dto.email || !dto.contrasena) {
      throw new BadRequestException('Email y contraseña son obligatorios');
    }

    // Verificar si el usuario ya existe
    const existe = await this.usuarioService.findByEmail(dto.email);
    if (existe) {
      console.log(`⚠️ Ya existe un usuario con el email: ${dto.email}`);
      return;
    }

    // Hashear la contraseña
    const hashedPassword = await BcryptHelper.HashPassword(dto.contrasena);

    // Crear el usuario con rol ADMIN
    const nuevoUsuario = await this.usuarioService.create({
      email: dto.email,
      contrasena: hashedPassword,
      rol: Rol.ADMIN,
      fecha_registro: new Date(),
      estado: EstadoUsuario.ACTIVO,
    });

    // Crear el empleado asociado al usuario
    const nuevoEmpleado = this.empleadoRepository.create({
      ...dto,
      usuario: nuevoUsuario,
    });

    await this.empleadoRepository.save(nuevoEmpleado);

    console.log(`✅ Admin creado: ${dto.email}`);
  }
}
