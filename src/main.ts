import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { serverPort } from 'src/utils/processEnv';

async function bootstrap() {
  require('dotenv').config();
  const port = serverPort();

  const app = await NestFactory.create(AppModule);
  await app.listen(port, () => {
    console.log(`server started on http://localhost:${port}`);
  });
}

bootstrap();
