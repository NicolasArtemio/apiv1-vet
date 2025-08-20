import { Test, TestingModule } from '@nestjs/testing';
import { VacunacionService } from './vacunacion.service';

describe('VacunacionService', () => {
  let service: VacunacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VacunacionService],
    }).compile();

    service = module.get<VacunacionService>(VacunacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
