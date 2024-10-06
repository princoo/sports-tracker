import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  // This method is required for NestMiddleware
  async use(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.userId;
    const user = await this.usersService.getUserById(userId);
    if (!user) {
      throw new BadRequestException(`User with ID ${userId} not found.`);
    }
    next();
  }
}
