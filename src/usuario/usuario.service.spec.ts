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
      const usuarioDto = {
        email: 'nico@gmail.com',
        contrasena: '123456',
      };

      const resultadoEsperado = { id: 1, ...usuarioDto };

      mockRepositoryUsuario.create.mockReturnValue(resultadoEsperado);
      mockRepositoryUsuario.save.mockResolvedValue(resultadoEsperado);

      const resultado = await service.create(usuarioDto);

      expect(mockRepositoryUsuario.create).toHaveBeenCalledWith(usuarioDto);
      expect(mockRepositoryUsuario.save).toHaveBeenCalledWith(resultadoEsperado);
      expect(resultado).toEqual(resultadoEsperado);
    });
  });

  describe('findAll', () => {
    it('debería devolver un array de usuarios', async () => {
      const resultadoEsperado = [
        { id: 1, email: 'nico@gmail.com', contrasena: '123456' },
        { id: 2, email: 'mar@gmail.com', contrasena: '234567' },
      ];

      mockRepositoryUsuario.find.mockResolvedValue(resultadoEsperado);

      const resultado = await service.findAll();
      expect(mockRepositoryUsuario.find).toHaveBeenCalled();
      expect(resultado).toEqual(resultadoEsperado);
    });
  });

  describe('findOne', () => {
    it('debería devolver un usuario por id', async () => {
      const id = 1;
      const resultadoEsperado = {
        id: 1,
        email: 'nico@gmail.com',
        contrasena: '123456',
      };

      mockRepositoryUsuario.findOneBy.mockResolvedValue(resultadoEsperado);

      const resultado = await service.findOne(id);
      expect(mockRepositoryUsuario.findOneBy).toHaveBeenCalledWith({ id });
      expect(resultado).toEqual(resultadoEsperado);
    });
  });

  describe('update', () => {
    it('debería actualizar un usuario por id', async () => {
      const id = 1;
      const updateUsuarioDto = {
        email: 'nico@gmail.com',
        contrasena: '1234567',
      };

      const usuarioExistente = {
        id: 1,
        email: 'rober@gmail.com',
        contrasena: '111111',
      };

       const resultadoEsperado = { id, ...updateUsuarioDto };
     
           mockRepositoryUsuario.findOneBy.mockResolvedValue(usuarioExistente);
           mockRepositoryUsuario.create.mockReturnValue(resultadoEsperado);
           mockRepositoryUsuario.save.mockResolvedValue(resultadoEsperado);
     
           const resultado = await service.update(id, updateUsuarioDto);
           expect(mockRepositoryUsuario.findOneBy).toHaveBeenCalledWith({ id });
           expect(mockRepositoryUsuario.create).toHaveBeenCalledWith({ ...usuarioExistente, ...updateUsuarioDto});
           expect(mockRepositoryUsuario.save).toHaveBeenCalledWith(resultadoEsperado);
           expect(resultado).toEqual(resultadoEsperado);
         });
       });
     

  describe('remove', () => {
    it('debería eliminar un usuario por id', async () => {
      const id = 1;
      const resultadoEsperado = {
        id: 1,
        email: 'mar@gmail.com',
      };

      mockRepositoryUsuario.findOneBy.mockResolvedValue(resultadoEsperado);
      mockRepositoryUsuario.remove.mockResolvedValue(resultadoEsperado);

      const resultado = await service.remove(id);
      expect(mockRepositoryUsuario.findOneBy).toHaveBeenCalledWith({id });
      expect(mockRepositoryUsuario.remove).toHaveBeenCalledWith(resultadoEsperado);
      expect(resultado).toEqual(resultadoEsperado);
    });
  });
});