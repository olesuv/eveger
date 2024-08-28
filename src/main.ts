import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  require('dotenv').config();
  const port = process.env.PORT || 3000;

  const app = await NestFactory.create(AppModule);
  await app.listen(port, () => {
    console.log(`server started on http://localhost:${port}`);
  });
}

bootstrap();
