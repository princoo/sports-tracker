import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { CheckTestIdExistsMiddleware } from 'src/core/middlewares/test/checkTestIdExists.middleware';
import { AuthService } from 'src/auth/auth.service';
import { BcryptService } from 'src/utility/bcrypt/bcrypt.service';
import { RolesModule } from 'src/roles/roles.module';
import { UsersModule } from 'src/users/users.module';
import { checkTestNameExists } from 'src/core/middlewares/test/checkTestNameExists.middleware';
import { CheckUpdatedNameExists } from 'src/core/middlewares/test/checkUpdatedNameExists';

@Module({
  imports: [RolesModule, UsersModule],
  controllers: [TestController],
  providers: [TestService, AuthService, BcryptService],
})
export class TestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckTestIdExistsMiddleware)
      .forRoutes(
        { path: 'test/:testId', method: RequestMethod.PATCH },
        { path: 'test/:testId', method: RequestMethod.GET },
        { path: 'test/:testId', method: RequestMethod.DELETE },
      );
    consumer
      .apply(checkTestNameExists)
      .forRoutes({ path: 'test', method: RequestMethod.POST });
    consumer
      .apply(CheckUpdatedNameExists)
      .forRoutes({ path: 'test/:testId', method: RequestMethod.PATCH });
  }
}
