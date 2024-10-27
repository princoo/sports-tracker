import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { SiteService } from './site.service';
import { SiteController } from './site.controller';
import { AuthService } from 'src/auth/auth.service';
import { BcryptService } from 'src/utility/bcrypt/bcrypt.service';
import { RolesModule } from 'src/roles/roles.module';
import { UsersModule } from '../users/users.module';
import { CheckSiteExistsMiddleware } from 'src/core/middlewares/site/check_site_exists.middleware';
import { CheckSiteIdExistsMiddleware } from 'src/core/middlewares/site/CheckSiteIdExists.middleware';
import { CheckUpdatedNameExists } from 'src/core/middlewares/site/checkUpdatedNameExists';

@Module({
  imports: [RolesModule, UsersModule],
  controllers: [SiteController],
  providers: [SiteService, AuthService, BcryptService],
  exports: [SiteService],
})
export class SiteModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckSiteExistsMiddleware)
      .forRoutes({ path: 'site', method: RequestMethod.POST });

    consumer
      .apply(CheckSiteIdExistsMiddleware)
      .forRoutes({ path: 'site/:siteId', method: RequestMethod.DELETE });

    consumer
      .apply(CheckUpdatedNameExists)
      .forRoutes({ path: 'site/:siteId', method: RequestMethod.PATCH });
  }
}
