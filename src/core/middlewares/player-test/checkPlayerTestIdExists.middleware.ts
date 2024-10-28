import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { CustomRequest } from 'src/core/interface/customRequest.interface';
import { PlayerTestService } from 'src/player-test/player-test.service';

@Injectable()
export class checkPlayerTestIdExists implements NestMiddleware {
  constructor(private playerTestService: PlayerTestService) {}
  async use(req: CustomRequest, res: Response, next: NextFunction) {
    const playerTestId = req.params.playerTestId;

    const playerTest = await this.playerTestService.findOne(playerTestId);
    if (!playerTest) {
      throw new BadRequestException(`PlayerTest does not exists`);
    }
    next();
  }
}
