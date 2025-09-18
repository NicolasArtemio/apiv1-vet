import { Test, TestingModule } from '@nestjs/testing';
import { MascotasService } from './mascotas.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Mascota } from './entities/mascota.entity';
import { mockRepositoryCliente, mockRepositoryMascota } from './mock';
import { Cliente } from '../cliente/entities/cliente.entity';
import { ClienteService } from '../cliente/cliente.service';
import { UpdateMascotasDto } from './dto/update-mascotas.dto';

describe('MascotasService', () => {
  let service: MascotasService;
  let serviceCliente: ClienteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MascotasService,
        ClienteService,
        { provide: getRepositoryToken(Mascota), useValue: mockRepositoryMascota },
        { provide: getRepositoryToken(Cliente), useValue: mockRepositoryCliente },
       
      ],
    }).compile();

    service = module.get<MascotasService>(MascotasService);
    serviceCliente = module.get<ClienteService>(ClienteService);
  });

  it('debería estar definido el servicio Cliente', () => {
    expect(serviceCliente).toBeDefined();
  });

  it('debería estar definido el servicio Mascota', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('debería crear una mascota', async () => {
      const mascotaDto = {
        nombre: 'bella',
        cliente_id: 1,
        especie: 'perro',
        raza: 'cuco',
        peso: 10,
        edad: 2,
        esterilizado: true,
        foto: 'ruta/a/foto.jpg',
        observaciones: 'muy juguetona',
      };
      const resultadoEsperado = { id: 1, ...mascotaDto };

      mockRepositoryMascota.create.mockReturnValue(resultadoEsperado);
      mockRepositoryMascota.save.mockResolvedValue(resultadoEsperado);

      const resultado = await service.create(mascotaDto);
      expect(mockRepositoryMascota.create).toHaveBeenCalledWith(mascotaDto);
      expect(mockRepositoryMascota.save).toHaveBeenCalledWith(resultadoEsperado);
      expect(resultado).toEqual(resultadoEsperado);
    });
  });

  describe('findAll', () => {
    it('debería devolver un array de mascotas', async () => {
      const resultadoEsperado = [
        { id: 1, nombre: 'bella', especie: 'perro', raza: 'cuco', peso: 10, edad: 2, esterilizado: true, foto: 'ruta/a/foto.jpg', observaciones: 'muy juguetona' },
        { id: 2, nombre: 'toby', especie: 'gato', raza: 'siames', peso: 10, edad: 3, esterilizado: true, foto: 'ruta/a/foto.jpg', observaciones: 'muy jugueton' },
      ];

      mockRepositoryMascota.find.mockResolvedValue(resultadoEsperado);

      const resultado = await service.findAll();
      expect(mockRepositoryMascota.find).toHaveBeenCalled();
      expect(resultado).toEqual(resultadoEsperado);
    });
  });

  describe('findOne', () => {
    it('debería devolver una mascota por id', async () => {
      const id = 1;
      const resultadoEsperado = { id, nombre: 'bella', especie: 'perro', raza: 'cuco', peso: 10, edad: 2, esterilizado: true, foto: 'ruta/a/foto.jpg', observaciones: 'muy juguetona' };

      mockRepositoryMascota.findOneBy.mockResolvedValue(resultadoEsperado);

      const resultado = await service.findOne(id);
      expect(mockRepositoryMascota.findOneBy).toHaveBeenCalledWith({ id });
      expect(resultado).toEqual(resultadoEsperado);
    });
  });

  describe('update', () => {
    it('debería actualizar una mascota por id', async () => {
      const id = 1;
      const updateMascotaDto: UpdateMascotasDto = {
        nombre: 'bella',
        especie: 'perro',
        raza: 'cuco',
        peso: 12,
        edad: 3,
        esterilizado: false,
        foto: 'ruta/a/foto_nueva.jpg',
        observaciones: 'más tranquila',
      };

      const mascotaExistente = { id, nombre: 'bella', especie: 'perro', raza: 'cuco', peso: 10, edad: 2, esterilizado: true, foto: 'ruta/a/foto.jpg', observaciones: 'muy juguetona' };
      const resultadoEsperado = { id, ...updateMascotaDto };

      mockRepositoryMascota.findOneBy.mockResolvedValue(mascotaExistente);
      mockRepositoryMascota.create.mockReturnValue(resultadoEsperado);
      mockRepositoryMascota.save.mockResolvedValue(resultadoEsperado);

      const resultado = await service.update(id, updateMascotaDto);
      expect(mockRepositoryMascota.findOneBy).toHaveBeenCalledWith({ id });
      expect(mockRepositoryMascota.create).toHaveBeenCalledWith({ ...mascotaExistente, ...updateMascotaDto });
      expect(mockRepositoryMascota.save).toHaveBeenCalledWith(resultadoEsperado);
      expect(resultado).toEqual(resultadoEsperado);
    });
  });

  describe('remove', () => {
    it('debería eliminar una mascota por id', async () => {
      const id = 1;
      const resultadoEsperado = { id, nombre: 'bella', especie: 'perro', raza: 'cuco', peso: 10, edad: 2, esterilizado: true, foto: 'ruta/a/foto.jpg', observaciones: 'muy juguetona' };

      mockRepositoryMascota.findOneBy.mockResolvedValue(resultadoEsperado);
      mockRepositoryMascota.remove.mockResolvedValue(resultadoEsperado);

      const resultado = await service.remove(id);
      expect(mockRepositoryMascota.findOneBy).toHaveBeenCalledWith({ id });
      expect(mockRepositoryMascota.remove).toHaveBeenCalledWith(resultadoEsperado);
      expect(resultado).toEqual(resultadoEsperado);
    });
  });
});
