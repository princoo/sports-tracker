import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { CheckSiteIdExistsMiddleware } from 'src/core/middlewares/site/CheckSiteIdExists.middleware';
import { SiteModule } from 'src/site/site.module';
import { AuthModule } from 'src/auth/auth.module';
import { CoachOnSiteModule } from 'src/coach-on-site/coach-on-site.module';
import { CheckPlayerExists } from 'src/core/middlewares/player/checkPlayerExists.middleware';

@Module({
  imports: [SiteModule, AuthModule, CoachOnSiteModule],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckSiteIdExistsMiddleware).forRoutes(
      {
        path: 'players/:siteId',
        method: RequestMethod.POST,
      },
      {
        path: 'players/:siteId',
        method: RequestMethod.GET,
      },
    );
    consumer.apply(CheckPlayerExists).forRoutes(
      {
        path: 'players/:playerId',
        method: RequestMethod.PATCH,
      },
      {
        path: 'players/:playerId',
        method: RequestMethod.DELETE,
      },
    );
  }
}
