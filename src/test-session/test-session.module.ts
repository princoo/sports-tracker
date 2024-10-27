import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TestSessionService } from './test-session.service';
import { TestSessionController } from './test-session.controller';
import { RolesModule } from 'src/roles/roles.module';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from 'src/auth/auth.service';
import { BcryptService } from 'src/utility/bcrypt/bcrypt.service';
import { checkSessionIdExists } from 'src/core/middlewares/test-session/checkSessionIdExists.middleware';
import { checkActiveSessions } from 'src/core/middlewares/test-session/checkActiveSessions.middleware';
import { checkExiredSessions } from 'src/core/middlewares/test-session/checkExiredSessions.middleware';
import { checkSessionInUse } from 'src/core/middlewares/test-session/checkSessionInUse.middleware';

@Module({
  imports: [RolesModule, UsersModule],
  controllers: [TestSessionController],
  providers: [TestSessionService, AuthService, BcryptService],
})
export class TestSessionModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(checkSessionIdExists)
      .forRoutes(
        { path: 'test-session/:sessionId', method: RequestMethod.PATCH },
        { path: 'test-session/:sessionId', method: RequestMethod.GET },
        { path: 'test-session/:sessionId', method: RequestMethod.DELETE },
      );
    consumer
      .apply(checkActiveSessions)
      .forRoutes({ path: 'test-session', method: RequestMethod.POST });
    consumer.apply(checkExiredSessions).forRoutes({
      path: 'test-session/:sessionId',
      method: RequestMethod.PATCH,
    });
    consumer.apply(checkSessionInUse).forRoutes({
      path: 'test-session/:sessionId',
      method: RequestMethod.DELETE,
    });
  }
}
