import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthService } from 'src/auth/auth.service';
import { BcryptService } from 'src/utility/bcrypt/bcrypt.service';
import { RolesModule } from 'src/roles/roles.module';
import { UserMiddleware } from 'src/core/middlewares/user/check_user_exists.middleware';

@Module({
  imports: [RolesModule],
  controllers: [UsersController],
  providers: [UsersService, AuthService, BcryptService],
  exports: [UsersService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    // If you want to use a specific middleware method:
    consumer
      .apply(UserMiddleware)
      .forRoutes({ path: 'users/role/:userId', method: RequestMethod.PATCH });
  }
}
