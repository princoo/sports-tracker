import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prismaClient/prisma.service';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}
  async getRoleByName(name: string) {
    const result = await this.prisma.role.findUnique({
      where: { roleName: name },
    });
    return result;
  }
  async getUserRole(userId: string) {
    const result = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });
    return result;
  }
}
