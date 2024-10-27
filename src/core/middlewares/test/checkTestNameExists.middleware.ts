import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TestService } from 'src/test/test.service';
@Injectable()
export class checkTestNameExists implements NestMiddleware {
  constructor(private testService: TestService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body;
    if (name) {
      const site = await this.testService.findByName(name);
      if (site) {
        throw new BadRequestException(`Test with name ${name} already exists.`);
      }
    }
    next();
  }
}
