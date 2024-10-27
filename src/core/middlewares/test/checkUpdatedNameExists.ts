import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TestService } from 'src/test/test.service';

@Injectable()
export class CheckUpdatedNameExists implements NestMiddleware {
  constructor(private testService: TestService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body;
    const testId = req.params.testId;
    if (name) {
      const test = await this.testService.findByName(name);
      if (test && test.id !== testId) {
        throw new BadRequestException(`Test with name ${name} already exists.`);
      }
    }
    next();
  }
}
