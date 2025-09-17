import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from './usuario.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';


export const mockRepositoryUsuario = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOneBy: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),

};
describe('UsuarioService', () => {
  let service: UsuarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuarioService,
        { provide: getRepositoryToken(Usuario), useValue: mockRepositoryUsuario },
      ],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
  });

  it('debería estar definido el servicio Usuario', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('debería crear un usuario', async () => {
      const UsuarioDto = {
        email: 'nico@example.com',
        contrasena: '123456',
      };

      const resultadoEsperado = { id_usuario: 1, ...UsuarioDto };

      mockRepositoryUsuario.create.mockReturnValue(resultadoEsperado);
      mockRepositoryUsuario.save.mockResolvedValue(resultadoEsperado);

      const resultado = await service.create(UsuarioDto);

      expect(mockRepositoryUsuario.create).toHaveBeenCalledWith(UsuarioDto);
      expect(mockRepositoryUsuario.save).toHaveBeenCalledWith(resultadoEsperado);
      expect(resultado).toEqual(resultadoEsperado);
    });
  });
  describe('findAll', () => {
    it('deberia que devolver un array de usuario', async () => {
      const resultadoEsperado = [
        {
          id_usuario: 1,
          email: 'nico@gmail.com',
          contrasena: '123456',
        },
        {
          id_usuario: 2,
          email: 'mar@gmail.com',
          contrasena: '234567',
        }]
      mockRepositoryUsuario.find.mockResolvedValue(resultadoEsperado);

      const resultado = await service.findAll();
      expect(mockRepositoryUsuario.find).toHaveBeenCalled();
      expect(resultado).toEqual(resultadoEsperado);
    });
  });
  describe('findOne', () => {
    it('deberia devolver un cliente por id', async () => {
      const id = 1;
      const resultadoEsperado = {
        id_usuario: 1,
        email: 'nico@gmai.com',
        contrasena: '123456',
      };
      mockRepositoryUsuario.findOneBy.mockResolvedValue(resultadoEsperado);

      const resultado = await service.findOne(id);
      expect(mockRepositoryUsuario.findOneBy).toHaveBeenCalledWith({ id });
      expect(resultado).toEqual(resultadoEsperado);
    });
  });
  describe('update', () => {
    it('deberia actualiza un usario', async () => {
      const id = 1;
      const updateUsuarioDto = {
        email: 'nico@gmail.com',
        contrasena: '1234567',
      }
      const resultadoEsperado = {
        id_usuario: 1, ...updateUsuarioDto
      }
      mockRepositoryUsuario.create.mockReturnValue(resultadoEsperado);
      mockRepositoryUsuario.save.mockResolvedValue(resultadoEsperado);
    })
  });
  describe('remove', () => {
    it('deberia eliminar un usuario por id', async () => {
      const id = 1;
      const resultadoEsperado = {
        id_usuario: 1,
        email: 'mar@getMaxListeners.com'

      }
      mockRepositoryUsuario.findOneBy.mockResolvedValue(resultadoEsperado);
      mockRepositoryUsuario.remove.mockResolvedValue(resultadoEsperado);
      const resultado = await service.remove(id);
      expect(mockRepositoryUsuario.findOneBy).toHaveBeenCalledWith({ id });
      expect(mockRepositoryUsuario.remove).toHaveBeenCalledWith(resultadoEsperado);
      expect(resultado).toEqual(resultadoEsperado);
    })
  })
});
