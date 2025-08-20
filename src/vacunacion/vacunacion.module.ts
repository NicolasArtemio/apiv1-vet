import { Module } from '@nestjs/common';
import { VacunacionService } from './vacunacion.service';
import { VacunacionController } from './vacunacion.controller';

@Module({
  controllers: [VacunacionController],
  providers: [VacunacionService],
})
export class VacunacionModule {}
