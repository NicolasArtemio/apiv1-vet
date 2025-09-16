import { Test, TestingModule } from '@nestjs/testing';
import { ClienteService } from './cliente.service';
import { mockRepositoryCliente } from './mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { UsuarioService } from '../usuario/usuario.service';
import { Usuario } from '../usuario/entities/usuario.entity';

describe('ClienteService', () => {
  let service: ClienteService;
  let serviceUsuario : UsuarioService;
  

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
});
