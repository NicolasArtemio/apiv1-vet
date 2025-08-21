import { Module } from '@nestjs/common';
import { VacunacionService } from './vacunacion.service';
import { VacunacionController } from './vacunacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vacunacion } from './entities/vacunacion.entity';

@Module({ imports: [TypeOrmModule.forFeature([Vacunacion])],
  controllers: [VacunacionController],
  providers: [VacunacionService],
})
export class VacunacionModule {}
