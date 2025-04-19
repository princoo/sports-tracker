import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { CustomRequest } from 'src/core/interface/customRequest.interface';
import { PrismaService } from 'src/prismaClient/prisma.service';
import { TestSessionService } from 'src/test-session/test-session.service';

@Injectable()
export class ActiveSessionGuard implements CanActivate {
  constructor(
    private prisma: PrismaService,
    private testSessionService: TestSessionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<CustomRequest>();

    // Check if there is an active session
    const activeSession = await this.testSessionService.findActiveSessions();

    if (!activeSession) {
      throw new UnauthorizedException('No active session available.');
    }
    request.sessionId = activeSession.id;

    return true;
  }
}
