import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CustomRequest } from '../interface/customRequest.interface';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest<CustomRequest>();
      const authToken = request.headers['authorization']?.split(' ')[1];
      if (!authToken) {
        throw new UnauthorizedException('Please Login');
      }

      const user = await this.authService.validateToken(authToken);
      request.user = user;
      return !!user; // Return true if user is authenticated
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
