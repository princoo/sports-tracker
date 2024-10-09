import {
  Injectable,
  NestMiddleware,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CoachOnSiteService } from '../../../coach-on-site/coach-on-site.service';
import { UserRoleEnum } from 'src/core/enums/roles.enum';

@Injectable()
export class checkCoachOnSiteExists implements NestMiddleware {
  constructor(private coachOnSiteService: CoachOnSiteService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const userId = req.body.userId || req.params.userId;
    if (!userId) {
      throw new BadRequestException('The userId is required');
    }
    const user = await this.coachOnSiteService.findSiteCoach(userId);
    if (!user) {
      throw new NotFoundException(`User with this ID not found`);
    }
    if (user.role.roleName !== UserRoleEnum.COACH) {
      throw new BadRequestException(`User must be a coach`);
    }
    if (user.Coach && req.method == 'POST') {
      throw new BadRequestException(
        `Selected coach already assigned to a site (${user.Coach.center.name}).`,
      );
    }
    if (!user.Coach && req.method == 'DELETE') {
      throw new BadRequestException(
        `Selected coach is not assigned to a any site.`,
      );
    }
    next();
  }
}
