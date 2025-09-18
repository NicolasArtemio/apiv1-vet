import { Test, TestingModule } from '@nestjs/testing';
import { EmpleadoService } from './empleado.service';
import { UsuarioService } from '../usuario/usuario.service';
import { Empleado } from './entities/empleado.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import { mockRepositoryEmpleado, mockRepositoryUsuario } from './mock';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('EmpleadoService', () => {
  let service: EmpleadoService;
  let serviceUsuario: UsuarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmpleadoService,
        UsuarioService,
        { provide: getRepositoryToken(Empleado), useValue: mockRepositoryEmpleado },
        { provide: getRepositoryToken(Usuario), useValue: mockRepositoryUsuario },
      ],
    }).compile();

    service = module.get<EmpleadoService>(EmpleadoService);
    serviceUsuario = module.get<UsuarioService>(UsuarioService);

  
  });

  it('debería estar definido el servicio Usuario', () => {
    expect(serviceUsuario).toBeDefined();
  });

  it('debería estar definido el servicio Empleado', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('debería crear un empleado', async () => {
      const empleadoDto = {
        nombre: 'Celeste',
        cliente_id: '1',
        apellido: 'Ruspil',
        fecha_nacimiento: new Date('1990-05-10'),
        dni: 12345678,
        telefono: '1122334455',
        ciudad: 'Buenos Aires',
        direccion: 'Av. Siempre Viva 123',
        especialidad: 'Veterinaria',
        email: 'celeste@example.com', 
         contrasena: '123456',
      };
      const resultadoEsperado = { id: 1, ...empleadoDto };

      mockRepositoryEmpleado.create.mockReturnValue(resultadoEsperado);
      mockRepositoryEmpleado.save.mockResolvedValue(resultadoEsperado);

      const resultado = await service.create(empleadoDto);

      expect(mockRepositoryEmpleado.create).toHaveBeenCalledWith(empleadoDto);
      expect(mockRepositoryEmpleado.save).toHaveBeenCalledWith(resultadoEsperado);
      expect(resultado).toEqual(resultadoEsperado);
    });
  });

  describe('findAll', () => {
    it('debería devolver un array de empleados', async () => {
      const resultadoEsperado = [
        {
          id: 1,
          nombre: 'Celeste',
          cliente_id: '1',
          apellido: 'Ruspil',
          fecha_nacimiento: new Date('1990-05-10'),
          dni: 12345678,
          telefono: '1122334455',
          ciudad: 'Buenos Aires',
          direccion: 'Av. Siempre Viva 123',
          especialidad: 'Veterinaria',
        },
        {
          id: 2,
          nombre: 'Carlos',
          cliente_id: '2',
          apellido: 'Pérez',
          fecha_nacimiento: new Date('1985-07-20'),
          dni: 87654321,
          telefono: '1199887766',
          ciudad: 'Rosario',
          direccion: 'Calle Falsa 456',
          especialidad: 'Peluquería Canina',
        },
      ];

      mockRepositoryEmpleado.find.mockResolvedValue(resultadoEsperado);

      const resultado = await service.findAll();

      expect(mockRepositoryEmpleado.find).toHaveBeenCalled();
      expect(resultado).toEqual(resultadoEsperado);
    });
  });

  describe('findOne', () => {
    it('debería devolver un empleado por id', async () => {
      const id = 1;
      const resultadoEsperado = {
        id,
        nombre: 'Celeste',
        cliente_id: '1',
        apellido: 'Ruspil',
        fecha_nacimiento: new Date('1990-05-10'),
        dni: 12345678,
        telefono: '1122334455',
        ciudad: 'Buenos Aires',
        direccion: 'Av. Siempre Viva 123',
        especialidad: 'Veterinaria',
      };

      mockRepositoryEmpleado.findOneBy.mockResolvedValue(resultadoEsperado);

      const resultado = await service.findOne(id);

      expect(mockRepositoryEmpleado.findOneBy).toHaveBeenCalledWith({ id });
      expect(resultado).toEqual(resultadoEsperado);
    });
  });

    describe('update', () => {
  it('debería actualizar un empleado por id', async () => {
    const id = 1;
    const updateEmpleadoDto = { telefono: '1144556677', ciudad: 'La Plata' };

    // Simular que existe el empleado
    mockRepositoryEmpleado.findOne.mockResolvedValue({
      id,
      nombre: 'Celeste',
      apellido: 'Ruspil',
      telefono: '1122334455',
      ciudad: 'Buenos Aires',
      cliente_id: '1',
      especialidad: 'Veterinaria',
      fecha_nacimiento: new Date('1990-05-10'),
      dni: 12345678,
      direccion: 'Av. Siempre Viva 123',
    });

    // Simular save
    mockRepositoryEmpleado.save.mockResolvedValue({
      ...updateEmpleadoDto,
      id,
    });

    const resultado = await service.update(id, updateEmpleadoDto);

    expect(mockRepositoryEmpleado.findOne).toHaveBeenCalledWith({
      where: { id },
      relations: ['usuario'], 
    });
    expect(mockRepositoryEmpleado.save).toHaveBeenCalled();
    expect(resultado.telefono).toEqual(updateEmpleadoDto.telefono);
    expect(resultado.ciudad).toEqual(updateEmpleadoDto.ciudad);
  });
});


  describe('remove', () => {
    it('debería eliminar un empleado por id', async () => {
      const id = 1;

      mockRepositoryEmpleado.findOneBy.mockResolvedValue({ id });
      mockRepositoryEmpleado.remove.mockResolvedValue({ id } );

      await service.remove(id);

      expect(mockRepositoryEmpleado.findOneBy).toHaveBeenCalledWith({ id });
      expect(mockRepositoryEmpleado.remove).toHaveBeenCalledWith({ id });
    });
  });
});
