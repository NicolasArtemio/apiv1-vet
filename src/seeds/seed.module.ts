import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // si usas TypeORM
import { EmpleadoService } from '../empleado/empleado.service';
import { UsuarioService } from '../usuario/usuario.service';
import { AdminSeed } from './empleado.seed';
import { Empleado } from '../empleado/entities/empleado.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import { AppModule } from '../app.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AppModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([Empleado, Usuario]),
  ],
  providers: [AdminSeed, EmpleadoService, UsuarioService],
})
export class SeedModule {}
