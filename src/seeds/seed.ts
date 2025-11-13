import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { AdminSeed } from './empleado.seed';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(SeedModule);

  const seeder = appContext.get<AdminSeed>(AdminSeed);
  await seeder.run();

  await appContext.close();
}

bootstrap();
