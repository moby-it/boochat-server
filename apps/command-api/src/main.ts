import { ClassSerializerInterceptor, Logger } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //#region Middleware
  app.enableCors({ origin: '*', allowedHeaders: '*' });
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      excludePrefixes: ['_']
    })
  );
  //#endregion

  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(`🚀 Web Api is running on: http://localhost:${port}`);
}

bootstrap();
