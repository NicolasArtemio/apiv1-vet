import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UsuarioModule } from '../usuario/usuario.module';
import { EmpleadoModule } from 'src/empleado/empleado.module';

@Module({
  imports: [
    forwardRef(() => UsuarioModule),
    EmpleadoModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '5h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
