import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prismaClient/prisma.service';
import { CheckUserExistsMiddleware } from './check_user_exists.middleware';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersModule } from 'src/users/users.module';
import { RolesModule } from 'src/roles/roles.module';
import { BcryptService } from 'src/utility/bcrypt/bcrypt.service';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    RolesModule,
    JwtModule.register({
      global: true,
      secret: 'jwtConstants.secret',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthService,
    PrismaService,
    BcryptService,
    JwtService,
    LocalStrategy,
  ],
  controllers: [AuthController],
  // exports: [AuthService],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckUserExistsMiddleware).forRoutes('auth/signup');
  }
}
