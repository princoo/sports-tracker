import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { SiteService } from './site.service';
import { SiteController } from './site.controller';
import { AuthService } from 'src/auth/auth.service';
import { BcryptService } from 'src/utility/bcrypt/bcrypt.service';
import { RolesModule } from 'src/roles/roles.module';
import { UsersModule } from '../users/users.module';
import { CheckSiteExistsMiddleware } from 'src/core/middlewares/site/check_site_exists.middleware';
import { CheckSiteIdExistsMiddleware } from 'src/core/middlewares/site/CheckSiteIdExists.middleware';

@Module({
  imports: [RolesModule, UsersModule],
  controllers: [SiteController],
  providers: [SiteService, AuthService, BcryptService],
})
export class SiteModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckSiteExistsMiddleware)
      .forRoutes(
        { path: 'site', method: RequestMethod.POST },
        { path: 'site/:id', method: RequestMethod.PATCH },
      );

    consumer
      .apply(CheckSiteIdExistsMiddleware)
      .forRoutes({ path: 'site/:id', method: RequestMethod.DELETE });
  }
}
