import {
  BadRequestException,
  // HttpException,
  // HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from 'src/prismaClient/prisma.service';
@Injectable()
export class CheckUserExistsMiddleware implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, username, phone } = req.body;
      const existingUser = await this.prisma.user.findFirst({
        where: {
          OR: [{ email }, { userName: username }, { profile: { phone } }],
        },
        include: {
          profile: true,
        },
      });
      if (existingUser) {
        const errors = [];
        if (existingUser.email === email) {
          errors.push('Email already exists.');
        }
        if (existingUser.userName === username) {
          errors.push('Username already exists.');
        }
        if (existingUser.profile.phone === phone) {
          errors.push('Phone number already exists.');
        }
        throw new BadRequestException(errors.join(' '));
      }
      next();
    } catch (error) {
      throw error;
    }
  }
}
