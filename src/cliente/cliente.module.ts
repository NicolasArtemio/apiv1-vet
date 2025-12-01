import { Module, forwardRef } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { MascotasModule } from 'src/mascotas/mascotas.module';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { EmpleadoModule } from 'src/empleado/empleado.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cliente]),
    forwardRef(() => MascotasModule),
    forwardRef(() => UsuarioModule),
    forwardRef(() => EmpleadoModule),
  ],
  controllers: [ClienteController],
  providers: [ClienteService],
  exports: [ClienteService, TypeOrmModule],
})
export class ClienteModule {}
