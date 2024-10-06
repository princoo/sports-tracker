import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { SiteService } from 'src/site/site.service';

@Injectable()
export class CheckSiteIdExistsMiddleware implements NestMiddleware {
  constructor(private siteService: SiteService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const site = await this.siteService.findById(id);
    if (!site) {
      throw new BadRequestException(`Site with this ID does not exists.`);
    }
    next();
  }
}
