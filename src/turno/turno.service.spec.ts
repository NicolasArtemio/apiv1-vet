import { Test, TestingModule } from '@nestjs/testing';
import { TurnoService } from './turno.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Turno } from './entities/turno.entity';
import { UpdateTurnoDto } from './dto/update-turno.dto';
import { CreateTurnoDto } from './dto/create-turno.dto';
import { EstadoTurno } from '../enums/estado-turno.enum';

const mockRepositoryTurno = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOneBy: jest.fn(),
  remove: jest.fn(),
};

describe('TurnoService', () => {
  let service: TurnoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TurnoService,
        { provide: getRepositoryToken(Turno), useValue: mockRepositoryTurno },
      ],
    }).compile();

    service = module.get<TurnoService>(TurnoService);
    jest.clearAllMocks();
  });

  it('debería estar definido el servicio', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('debería crear un turno con CreateTurnoDto', async () => {
      const turnoDto: CreateTurnoDto = {
        fecha_turno: new Date('2025-09-17'),
          estado: EstadoTurno.PENDIENTE,
        observaciones: 'ninguna',
      };

      const resultadoEsperado = { id: 1, ...turnoDto };

      mockRepositoryTurno.create.mockReturnValue(resultadoEsperado);
      mockRepositoryTurno.save.mockResolvedValue(resultadoEsperado);

      const resultado = await service.create(turnoDto);

      expect(mockRepositoryTurno.create).toHaveBeenCalledWith(turnoDto);
      expect(mockRepositoryTurno.save).toHaveBeenCalledWith(resultadoEsperado);
      expect(resultado).toEqual(resultadoEsperado);
    });
  });

  describe('findAll', () => {
    it('debería devolver un array de turnos', async () => {
      const resultadoEsperado = [
        { id: 1, fecha_turno: new Date('2025-09-17'), estado: 'pendiente', observaciones: 'ninguna' },
        { id: 2, fecha_turno: new Date('2025-09-25'), estado: 'confirmado', observaciones: 'traer estudios' },
      ];

      mockRepositoryTurno.find.mockResolvedValue(resultadoEsperado);

      const resultado = await service.findAll();

      expect(mockRepositoryTurno.find).toHaveBeenCalled();
      expect(resultado).toEqual(resultadoEsperado);
    });
  });

  describe('findOne', () => {
    it('debería devolver un turno por id', async () => {
      const id = 1;
      const resultadoEsperado = { id, fecha_turno: new Date('2025-09-23'), estado: 'pendiente', observaciones: 'ninguna' };

      mockRepositoryTurno.findOneBy.mockResolvedValue(resultadoEsperado);

      const resultado = await service.findOne(id);

      expect(mockRepositoryTurno.findOneBy).toHaveBeenCalledWith({ id_turno: id });
      expect(resultado).toEqual(resultadoEsperado);
    });
  });

  describe('update', () => {
    it('debería actualizar un turno por id', async () => {
      const id = 1;
      const updateTurnoDto: UpdateTurnoDto = { observaciones: 'cambiar horario' };
      const turnoExistente = { id, fecha_turno: new Date('2025-09-15'), estado: 'pendiente', observaciones: 'ninguna' };
      const resultadoEsperado = { ...turnoExistente, ...updateTurnoDto };

      mockRepositoryTurno.findOneBy.mockResolvedValue(turnoExistente);
      mockRepositoryTurno.save.mockResolvedValue(resultadoEsperado);

      const resultado = await service.update(id, updateTurnoDto);

      expect(mockRepositoryTurno.findOneBy).toHaveBeenCalledWith({ id_turno: id });
      expect(mockRepositoryTurno.save).toHaveBeenCalledWith(resultadoEsperado);
      expect(resultado).toEqual(resultadoEsperado);
    });
  });

  describe('remove', () => {
    it('debería eliminar un turno por id', async () => {
      const id = 1;
      const turnoExistente = { id, fecha_turno: new Date('2025-09-25'), estado: 'pendiente', observaciones: 'ninguna' };

      mockRepositoryTurno.findOneBy.mockResolvedValue(turnoExistente);
      mockRepositoryTurno.remove.mockResolvedValue(turnoExistente);

      const resultado = await service.remove(id);

      expect(mockRepositoryTurno.findOneBy).toHaveBeenCalledWith({ id_turno: id });
      expect(mockRepositoryTurno.remove).toHaveBeenCalledWith(turnoExistente);
      expect(resultado).toEqual(turnoExistente);
    });
  });
});
