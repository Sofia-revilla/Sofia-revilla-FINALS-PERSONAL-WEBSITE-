import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable this so your Vue frontend can talk to the backend
  app.enableCors(); 
  await app.listen(3000);
}
bootstrap();