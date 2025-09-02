import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VentasModule } from './ventas/ventas.module';
import { PagoModule } from './pago/pago.module';
import { DetalleVentaModule } from './detalle_venta/detalle_venta.module';
import { ProductosModule } from './productos/productos.module';
import { InventarioModule } from './inventario/inventario.module';

import { UsuarioModule } from './usuario/usuario.module';
import { ClienteModule } from './cliente/cliente.module';
import { EmpleadoModule } from './empleado/empleado.module';
import { MensajeModule } from './mensaje/mensaje.module';
import { TurnoModule } from './turno/turno.module';
import { NotificacionesModule } from './notificaciones/notificaciones.module';
import { MascotasModule } from './mascotas/mascotas.module';
import { VacunacionModule } from './vacunacion/vacunacion.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.getOrThrow<string>('DB_PORT'), 10),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true, // ¡no usar en producción!
        // dropSchema: true, // no usar en produccion!
      }),
    }),
    VentasModule,
    PagoModule,
    DetalleVentaModule,
    ProductosModule,
    InventarioModule,

    UsuarioModule,
    ClienteModule,
    EmpleadoModule,

    VentasModule,
    PagoModule,
    DetalleVentaModule,
    ProductosModule,
    InventarioModule,
    MensajeModule,
    TurnoModule,
    NotificacionesModule,
    MascotasModule,
    VacunacionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
