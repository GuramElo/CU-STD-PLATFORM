import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cluster from 'cluster';
import { cpus } from 'os';
import * as dotenv from 'dotenv';

const environment = process.env.NODE_ENV || 'development';
dotenv.config({ path: `environments/.env.${environment}` });
const numCPUs = cpus().length;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  // =============================================
  const config = new DocumentBuilder()
    .setTitle('CU_STD_PLATFORM')
    .setDescription('პლატფორმა სტუნდენტებისთვის')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('_/swagger', app, document);
  // =============================================
  const port = process.env.PORT || 3000;
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

if (process.env.isProd) {
  if (cluster.isPrimary) {
    Logger.log(`Master ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
      Logger.log(`worker ${worker.process.pid} died`);
    });
  } else {
    bootstrap()
      .then()
      .catch((err) => Logger.error('Nest application failed to start', err));
  }
} else {
  bootstrap()
    .then()
    .catch((err) => Logger.error('Nest application failed to start', err));
}
