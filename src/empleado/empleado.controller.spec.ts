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

    jest.clearAllMocks();
  });

  it('debería estar definido el controller', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('debería fallar al crear un empleado', async () => {
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

      mockEmpleadoService.create.mockRejectedValue(new Error('Error al crear empleado'));

      await expect(controller.create(empleadoDto)).rejects.toThrow('Error al crear empleado');
    });
  });

  describe('findAll', () => {
    it('debería fallar al devolver un array de empleados', async () => {
      mockEmpleadoService.findAll.mockRejectedValue(new Error('Error al buscar empleados'));

      await expect(controller.findAll()).rejects.toThrow('Error al buscar empleados');
    });
  });

  describe('findOne', () => {
    it('debería fallar al buscar un empleado por id', async () => {
      const id = '1';
      mockEmpleadoService.findOne.mockRejectedValue(new Error('Empleado no encontrado'));

      await expect(controller.findOne(id)).rejects.toThrow('Empleado no encontrado');
    });
  });

  describe('update', () => {
    it('debería fallar al actualizar un empleado por id con todos los campos', async () => {
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

      mockEmpleadoService.update.mockRejectedValue(new Error('Error al actualizar empleado'));

      await expect(controller.update(id, updateEmpleadoDto)).rejects.toThrow('Error al actualizar empleado');
    });
  });

  describe('remove', () => {
    it('debería fallar al eliminar un empleado por id', async () => {
      const id = '1';
      mockEmpleadoService.remove.mockRejectedValue(new Error('Error al eliminar empleado'));

      await expect(controller.remove(id)).rejects.toThrow('Error al eliminar empleado');
    });
  });
});
