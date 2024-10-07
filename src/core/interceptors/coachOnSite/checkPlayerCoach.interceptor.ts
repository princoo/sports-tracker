import {
  Injectable,
  ForbiddenException,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { CoachOnSiteService } from '../../../coach-on-site/coach-on-site.service';
import { UserRoleEnum } from 'src/core/enums/roles.enum';
import { CustomRequest } from 'src/core/interface/customRequest.interface';

@Injectable()
export class CheckPlayerCoach implements NestInterceptor {
  constructor(private coachOnSiteService: CoachOnSiteService) {}
  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest<CustomRequest>();
    if (request.user.role.roleName == UserRoleEnum.COACH) {
      const playerId = request.params.playerId;
      const isPlayerCoach =
        await this.coachOnSiteService.isCoachRelatedToPlayer(
          request.user.id,
          playerId,
        );
      if (!isPlayerCoach) {
        throw new ForbiddenException(
          'You do not have permission to access this player',
        );
      }
    }
    return next.handle();
  }
}
