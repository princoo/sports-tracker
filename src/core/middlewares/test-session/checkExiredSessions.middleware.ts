import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TestSessionService } from 'src/test-session/test-session.service';
@Injectable()
export class checkExiredSessions implements NestMiddleware {
  constructor(private testSessionService: TestSessionService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const id = req.params.sessionId || req.body.sessionId;
    const session = await this.testSessionService.findOne(id);
    if (session.status === 'COMPLETED') {
      throw new BadRequestException(`Can not update a completed session`);
    }
    next();
  }
}
