import { Module, forwardRef } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { MascotasModule } from '../mascotas/mascotas.module';
import { UsuarioModule } from '../usuario/usuario.module';
import { EmpleadoModule } from '../empleado/empleado.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cliente]),
    forwardRef(() => MascotasModule),
    UsuarioModule,
    EmpleadoModule,
  ],
  controllers: [ClienteController],
  providers: [ClienteService],
  exports: [ClienteService, TypeOrmModule],
})
export class ClienteModule {}
