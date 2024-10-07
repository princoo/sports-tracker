import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { CoachOnSiteService } from './coach-on-site.service';
import { CoachOnSiteController } from './coach-on-site.controller';
import { checkCoachOnSiteExists } from 'src/core/middlewares/coachOnSite/checkCoachOnSiteExists.middleware';
import { AuthModule } from 'src/auth/auth.module';
import { CheckSiteIdExistsMiddleware } from 'src/core/middlewares/site/CheckSiteIdExists.middleware';
import { SiteModule } from 'src/site/site.module';

@Module({
  imports: [AuthModule, SiteModule],
  controllers: [CoachOnSiteController],
  providers: [CoachOnSiteService],
  exports: [CoachOnSiteService],
})
export class CoachOnSiteModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(checkCoachOnSiteExists)
      .forRoutes(
        { path: 'coach-on-site', method: RequestMethod.POST },
        { path: 'coach-on-site/:userId', method: RequestMethod.DELETE },
      );
    consumer
      .apply(CheckSiteIdExistsMiddleware)
      .forRoutes({ path: 'coach-on-site', method: RequestMethod.POST });
  }
}
