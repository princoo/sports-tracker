import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PlayerTestService } from 'src/player-test/player-test.service';

@Injectable()
export class CheckDuplicateSessiontest implements NestMiddleware {
  constructor(private playerTestService: PlayerTestService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const playerId = req.params.playerId;
    const sessionId = req.params.sessionId;
    const testId = req.params.testId;

    const playerTest = await this.playerTestService.findUnique(
      sessionId,
      testId,
      playerId,
    );
    if (playerTest) {
      throw new BadRequestException(
        `PlayerTest for this session already exists`,
      );
    }
    next();
  }
}
