import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config(); // Carga las variables de entorno manualmente
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors({
    origin: '*', // Permitir todas las solicitudes (puedes restringirlo a dominios específicos)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    credentials: true, // Si necesitas enviar cookies o credenciales
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
