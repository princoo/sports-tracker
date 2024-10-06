import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: NestJwtService,
  ) {}

  private secret = this.configService.get<string>('SECRET');
  generateToken(payload: any) {
    return this.jwtService.sign(payload, { secret: this.secret });
  }
}
