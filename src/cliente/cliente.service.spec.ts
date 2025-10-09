import { Test, TestingModule } from '@nestjs/testing';
import { ClienteService } from './cliente.service';
import { mockRepositoryCliente } from './mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { UsuarioService } from '../usuario/usuario.service';
import { Usuario } from '../usuario/entities/usuario.entity';

describe('ClienteService', () => {
  let service: ClienteService;
  let serviceUsuario: UsuarioService;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClienteService, UsuarioService,
        { provide: getRepositoryToken(Cliente), useValue: mockRepositoryCliente },
        { provide: getRepositoryToken(Usuario), useValue: {} }

      ],

    }).compile();

    service = module.get<ClienteService>(ClienteService);
    serviceUsuario = module.get<UsuarioService>(UsuarioService);
  });

  it('deberia estar el servicioUsuario definido', () => {
    expect(serviceUsuario).toBeDefined();
  });


  it('deberia estar el servicioCliente definido', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('deberia crear un cliente', async () => {
      const ClienteDto = {
        foto_perfil: 'ruta/a/foto.jpg',
        nombre: 'Juan',
        apellido: 'Perez',
        fecha_nacimiento: new Date('1990-01-01'),
        dni: 12345678,
        telefono: '123456789',
        ciudad: 'Olavarria',
        direccion: 'Calle Falsa 123',
        email: 'juanperez@gmail.com',
        contrasena: 'password123'
      };
      const resultadoEsperado = { id: 1, ...ClienteDto }
      
      mockRepositoryCliente.create.mockReturnValue(resultadoEsperado);
      mockRepositoryCliente.save.mockResolvedValue(resultadoEsperado);

      const resultado = await service.create(ClienteDto);
      expect(mockRepositoryCliente.create).toHaveBeenCalledWith(ClienteDto);
      expect(mockRepositoryCliente.save).toHaveBeenCalledWith(resultadoEsperado);
      expect(resultado).toEqual(resultadoEsperado);

    })
  });
  describe('findAll', () => {
    it('deberia que devolver un array de clientes', async () => {
      const resultadoEsperado = [
        {
          id: 1,
          foto_perfil: 'ruta/a/foto.jpg',
          nombre: 'Juan',
          apellido: 'Perez',
          fecha_nacimiento: new Date('1990-01-01'),
          dni: 12345678,
          telefono: '123456789',
          ciudad: 'Olavarria',
          direccion: 'Calle Falsa 123',
          email: 'juanperez@gmail.com',
          contrasena: 'password123'
        },
        {
          id: 2,
          foto_perfil: 'ruta/a/foto.jpg',
          nombre: 'Maria',
          apellido: 'Perez',
          fecha_nacimiento: new Date('1990-08-02'),
          dni: 12342134,
          telefono: '123412358',
          ciudad: 'Olavarria',
          direccion: 'Calle Falsa 789',
          email: 'mariaperez@gmail.com',
          contrasena: 'password123'
        },
        {
          id: 3,
          foto_perfil: 'ruta/a/foto.jpg',
          nombre: 'Juliana',
          apellido: 'Perez',
          fecha_nacimiento: new Date('1990-01-18'),
          dni: 78945612,
          telefono: '2284696965',
          ciudad: 'Olavarria',
          direccion: 'Calle Falsa 123',
          email: 'julianaperez@gmail.com',
          contrasena: 'password123'
        }
      ]
      mockRepositoryCliente.find.mockResolvedValue(resultadoEsperado);

      const resultado = await service.findAll();
      expect(mockRepositoryCliente.find).toHaveBeenCalled();
      expect(resultado).toEqual(resultadoEsperado);
    })
  })

  describe('findOne', () => {
    it('deberia devolver un cliente por id', async () => {
      const id = 1;
      const resultadoEsperado = {
        id: 1,
        foto_perfil: 'ruta/a/foto.jpg',
        nombre: 'Juan',
        apellido: 'Perez',
        fecha_nacimiento: new Date('1990-01-01'),
        dni: 12345678,
        telefono: '123456789',
        ciudad: 'Olavarria',
        direccion: 'Calle Falsa 123',
        email: 'juanperez@gmail.com'
      }
      mockRepositoryCliente.findOneBy.mockResolvedValue(resultadoEsperado);

      const resultado = await service.findOne(id);
      expect(mockRepositoryCliente.findOneBy).toHaveBeenCalledWith({ id });
      expect(resultado).toEqual(resultadoEsperado);
    })
  })

describe('update', () => {
  it('deberia actualizar un cliente por id', async () => {
    const id = 1;
    const updateClienteDto = {
      foto_perfil: 'ruta/a/foto.jpg',
      nombre: 'Juan Actualizado',
      apellido: 'Perez',
      fecha_nacimiento: new Date('1990-01-01'),
      dni: 12345678,
      telefono: '123456789',
      ciudad: 'Olavarria',
      direccion: 'Calle Falsa 456',
      email: 'juanactualizado@gmail.com'
    };

    const clienteExistente = {
      id,
      foto_perfil: 'ruta/a/foto.jpg',
      nombre: 'Juan',
      apellido: 'Perez',
      fecha_nacimiento: new Date('1990-01-01'),
      dni: 12345678,
      telefono: '123456789',
      ciudad: 'Olavarria',
      direccion: 'Calle Falsa 123',
      email: 'juanperez@gmail.com'
    };

    const resultadoEsperado = { id, ...updateClienteDto };

    mockRepositoryCliente.findOneBy.mockResolvedValue(clienteExistente);
    mockRepositoryCliente.create.mockReturnValue(resultadoEsperado);
    mockRepositoryCliente.save.mockResolvedValue(resultadoEsperado);

    const resultado = await service.update(id, updateClienteDto);

    expect(mockRepositoryCliente.findOneBy).toHaveBeenCalledWith({ id });
    expect(mockRepositoryCliente.create).toHaveBeenCalledWith({ id, ...updateClienteDto });
    expect(mockRepositoryCliente.save).toHaveBeenCalledWith(resultadoEsperado);
    expect(resultado).toEqual(resultadoEsperado);
  });
});


  describe('remove', () => {
    it('deberia eliminar un cliente por id', async () => {
      const id = 1;
      const resultadoEsperado = {
        id: 1,
        foto_perfil: 'ruta/a/foto.jpg',
        nombre: 'Juan',
        apellido: 'Perez',
        fecha_nacimiento: new Date('1990-01-01'),
        dni: 12345678,
        telefono: '123456789',
        ciudad: 'Olavarria',
        direccion: 'Calle Falsa 123',
        email: 'juanperez@gmail.com' }

        mockRepositoryCliente.findOneBy.mockResolvedValue(resultadoEsperado);
        mockRepositoryCliente.remove.mockResolvedValue(resultadoEsperado);  
        const resultado = await service.remove(id);
        expect(mockRepositoryCliente.findOneBy).toHaveBeenCalledWith({id});
        expect(mockRepositoryCliente.remove).toHaveBeenCalledWith(resultadoEsperado);
        expect(resultado).toEqual(resultadoEsperado);
    })
  })
});
