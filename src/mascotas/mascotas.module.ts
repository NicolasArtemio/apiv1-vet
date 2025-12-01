import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteModule } from 'src/cliente/cliente.module';
import { Mascota } from './entities/mascota.entity';
import { MascotasController } from './mascotas.controller';
import { MascotasService } from './mascotas.service';
import { Cliente } from 'src/cliente/entities/cliente.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Mascota, Cliente]),
    forwardRef(() => ClienteModule),
  ],
  controllers: [MascotasController],
  providers: [MascotasService],
  exports: [MascotasService],
})
export class MascotasModule {}
