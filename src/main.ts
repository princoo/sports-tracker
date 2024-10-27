import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './core/interceptors/response/response.interceptor';
import { HttpExceptionFilter } from './core/interceptors/response/httpExceptionFilter.exception';
import * as passport from 'passport';
import * as session from 'express-session';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const frontendUrl = configService.get<string>('FRONTEND_URL');

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  app.use(
    session({
      secret: 'yourSecretKey', // Replace with a strong secret
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 3600000 }, // Session valid for 1 hour
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.enableCors({
    origin: frontendUrl,
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
