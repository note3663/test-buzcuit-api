import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // cors
  app.enableCors();

  // middlewares
  app.use(helmet());
  await app.listen(process.env.PORT);
}
bootstrap();
