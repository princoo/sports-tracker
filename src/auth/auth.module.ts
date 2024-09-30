import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prismaClient/prisma.service';
import { BcryptService } from 'src/utility/bcrypt/bcrypt.service';
import { RolesService } from 'src/roles/roles.service';
import { CheckUserExistsMiddleware } from './check_user_exists.middleware';
@Module({
  providers: [AuthService, PrismaService, BcryptService, RolesService],
  controllers: [AuthController],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckUserExistsMiddleware).forRoutes('auth/signup');
  }
}
