import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './core/interceptors/response/response.interceptor';
import { HttpExceptionFilter } from './core/interceptors/response/httpExceptionFilter.exception';
import * as passport from 'passport';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
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
  await app.listen(3000);
}
bootstrap();
