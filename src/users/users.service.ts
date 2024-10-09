import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prismaClient/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByUsernameOrEmail(input: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: input }, { userName: input }],
      },
    });
    return user;
  }
  async getUserById(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  }
  async getUserDetailsById(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        userName: true,
        email: true,
        password: false,
        roleId: true,
        profile: true,
        status: true,
        role: { select: { roleName: true } },
      },
    });
    return user;
  }

  async changeUserRole(userId: string, roleId: string) {
    const result = await this.prisma.user.update({
      where: { id: userId },
      data: { roleId },
    });
    return result;
  }
}
