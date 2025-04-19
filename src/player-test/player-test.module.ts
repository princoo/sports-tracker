import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PlayerTestService } from './player-test.service';
import { PlayerTestController } from './player-test.controller';
import { CheckSiteIdExistsMiddleware } from 'src/core/middlewares/site/CheckSiteIdExists.middleware';
import { CheckTestIdExistsMiddleware } from 'src/core/middlewares/test/checkTestIdExists.middleware';
import { CheckPlayerExists } from 'src/core/middlewares/player/checkPlayerExists.middleware';
import { TestService } from 'src/test/test.service';
import { RolesModule } from 'src/roles/roles.module';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from 'src/auth/auth.service';
import { BcryptService } from 'src/utility/bcrypt/bcrypt.service';
import { TestSessionService } from 'src/test-session/test-session.service';
import { CoachOnSiteModule } from 'src/coach-on-site/coach-on-site.module';
import { SiteModule } from 'src/site/site.module';
import { PlayersService } from 'src/players/players.service';
import { CheckDuplicateSessiontest } from 'src/core/middlewares/player-test/checkDuplicateSessiontest.middleware copy';
import { CheckTestMetricsIdExists } from 'src/core/middlewares/player-test/checkTestMetricsIdExists.middleware';
import { checkPlayerTestIdExists } from 'src/core/middlewares/player-test/checkPlayerTestIdExists.middleware';
import { checkSessionIdExists } from 'src/core/middlewares/test-session/checkSessionIdExists.middleware';
@Module({
  imports: [RolesModule, UsersModule, CoachOnSiteModule, SiteModule],
  controllers: [PlayerTestController],
  providers: [
    PlayerTestService,
    TestService,
    PlayersService,
    TestSessionService,
    AuthService,
    BcryptService,
  ],
})
export class PlayerTestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        CheckSiteIdExistsMiddleware,
        CheckTestIdExistsMiddleware,
        CheckPlayerExists,
        CheckDuplicateSessiontest,
      )
      .forRoutes({
        path: 'player-test/:siteId/:testId/:playerId',
        method: RequestMethod.POST,
      });
    consumer
      .apply(CheckSiteIdExistsMiddleware, CheckTestMetricsIdExists)
      .forRoutes({
        path: 'player-test/:siteId/:testMetricId',
        method: RequestMethod.PATCH,
      });
    consumer
      .apply(CheckSiteIdExistsMiddleware, checkPlayerTestIdExists)
      .forRoutes({
        path: 'player-test/:siteId/:playerTestId',
        method: RequestMethod.DELETE,
      });
    consumer.apply(checkSessionIdExists).forRoutes({
      path: 'player-test/session/:sessionId',
      method: RequestMethod.GET,
    });
  }
}
