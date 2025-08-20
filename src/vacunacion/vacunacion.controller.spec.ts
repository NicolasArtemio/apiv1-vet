import { Test, TestingModule } from '@nestjs/testing';
import { VacunacionController } from './vacunacion.controller';
import { VacunacionService } from './vacunacion.service';

describe('VacunacionController', () => {
  let controller: VacunacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VacunacionController],
      providers: [VacunacionService],
    }).compile();

    controller = module.get<VacunacionController>(VacunacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
