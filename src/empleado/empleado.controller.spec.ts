import { Test, TestingModule } from '@nestjs/testing';
import { EmpleadoController } from './empleado.controller';
import { EmpleadoService } from './empleado.service';


const mockEmpleadoService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('EmpleadoController', () => {
  let controller: EmpleadoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmpleadoController],
      providers: [
        { provide: EmpleadoService, useValue: mockEmpleadoService },
      ],
    }).compile();

    controller = module.get<EmpleadoController>(EmpleadoController);

    jest.clearAllMocks(); // Limpia mocks 
  });

  it('debería estar definido el controller', () => {
    expect(controller).toBeDefined();
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
      mockEmpleadoService.create.mockResolvedValue(resultadoEsperado);

      const resultado = await controller.create(empleadoDto);

      expect(resultado).toEqual(resultadoEsperado);
      expect(mockEmpleadoService.create).toHaveBeenCalledWith(empleadoDto);
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

      mockEmpleadoService.findAll.mockResolvedValue(resultadoEsperado);

      const resultado = await controller.findAll();

      expect(mockEmpleadoService.findAll).toHaveBeenCalled();
      expect(resultado).toEqual(resultadoEsperado);
    });
  });

  describe('findOne', () => {
    it('debería devolver un empleado por id', async () => {
      const id = '1';
      const resultadoEsperado = {
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
      };

      mockEmpleadoService.findOne.mockResolvedValue(resultadoEsperado);

      const resultado = await controller.findOne(id);

      expect(mockEmpleadoService.findOne).toHaveBeenCalledWith(+id);
      expect(resultado).toEqual(resultadoEsperado);
    });
  });

  describe('update', () => {
    it('debería actualizar un empleado por id con todos los campos', async () => {
      const id = '1';
      const updateEmpleadoDto = {
        nombre: 'Celeste',
        apellido: 'Ruspil',
        telefono: '1144556677',
        ciudad: 'La Plata',
        especialidad: 'Veterinaria',
        fecha_nacimiento: new Date('1991-06-15'),
        dni: 87654321,
        direccion: 'Calle Nueva 456',
        email: 'celeste.ruspil@gmail.com',
        contrasena: 'nuevaPassword123',
      };

      const resultadoEsperado = { id: +id, ...updateEmpleadoDto };

      mockEmpleadoService.update.mockResolvedValue(resultadoEsperado);

      const resultado = await controller.update(id, updateEmpleadoDto);

      expect(mockEmpleadoService.update).toHaveBeenCalledWith(+id, updateEmpleadoDto);
      expect(resultado).toEqual(resultadoEsperado);
    });
  });

  describe('remove', () => {
    it('debería eliminar un empleado por id', async () => {
      const id = '1';
      mockEmpleadoService.remove.mockResolvedValue({ id: +id });

      const resultado = await controller.remove(id);

      expect(mockEmpleadoService.remove).toHaveBeenCalledWith(+id);
      expect(resultado).toEqual({ id: +id });
    });
  });
});
