import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TestSessionService } from 'src/test-session/test-session.service';
@Injectable()
export class checkSessionIdExists implements NestMiddleware {
  constructor(private testSessionService: TestSessionService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const id = req.params.sessionId || req.body.sessionId;
    if (!id) {
      throw new BadRequestException(`ID for test session is required`);
    }
    const test = await this.testSessionService.findOne(id);
    if (!test) {
      throw new BadRequestException(
        `Test session with this ID does not exists.`,
      );
    }
    next();
  }
}
