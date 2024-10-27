import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TestSessionService } from 'src/test-session/test-session.service';
@Injectable()
export class checkActiveSessions implements NestMiddleware {
  constructor(private testSessionService: TestSessionService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const date = req.body.date;
    const test = await this.testSessionService.findActive(date);
    if (test && test.length > 0) {
      throw new BadRequestException(`You already have an active Session.`);
    }
    const testOnSameDay = await this.testSessionService.findOnSameDay(date);
    if (testOnSameDay && testOnSameDay.length > 0) {
      throw new BadRequestException(
        `You have already set a Session for this day.`,
      );
    }
    next();
  }
}
