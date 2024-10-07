import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { SiteService } from 'src/site/site.service';

@Injectable()
export class CheckSiteExistsMiddleware implements NestMiddleware {
  constructor(private siteService: SiteService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body;
    if (name) {
      const site = await this.siteService.findOne(name);
      if (site) {
        throw new BadRequestException(`Site with name ${name} already exists.`);
      }
    }
    next();
  }
}
