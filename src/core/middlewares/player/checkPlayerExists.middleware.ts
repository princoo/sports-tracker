import {
  Injectable,
  NestMiddleware,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PlayersService } from 'src/players/players.service';

@Injectable()
export class CheckPlayerExists implements NestMiddleware {
  constructor(private playerService: PlayersService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const playerId = req.params.playerId;
    if (!playerId) {
      throw new BadRequestException('The playerId is required');
    }
    const player = await this.playerService.findOne(playerId);
    if (!player) {
      throw new NotFoundException(`Player with this ID not found`);
    }
    next();
  }
}
