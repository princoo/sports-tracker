import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { CustomRequest } from 'src/core/interface/customRequest.interface';
import { TestService } from 'src/test/test.service';
@Injectable()
export class CheckTestIdExistsMiddleware implements NestMiddleware {
  constructor(private testService: TestService) {}

  async use(req: CustomRequest, res: Response, next: NextFunction) {
    const id = req.params.testId || req.body.testId;
    if (!id) {
      throw new BadRequestException(`ID for test is required`);
    }
    const test = await this.testService.findOne(id);
    if (!test) {
      throw new BadRequestException(`Test with this ID does not exists.`);
    }
    req.requiredMetrics = test.requiredMetrics;
    next();
  }
}
