import { Injectable } from '@nestjs/common';
import { CreateCoachOnSiteDto } from './dto/create-coach-on-site.dto';
import { PrismaService } from 'src/prismaClient/prisma.service';

@Injectable()
export class CoachOnSiteService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCoachOnSiteDto: CreateCoachOnSiteDto) {
    return this.prisma.coachOnCenter.create({ data: createCoachOnSiteDto });
  }

  findAll() {
    return this.prisma.coachOnCenter.findMany({
      include: { user: { select: { email: true, userName: true } } },
    });
  }

  findOne(userId: string) {
    return this.prisma.coachOnCenter.findUnique({
      where: { userId },
      include: { center: true, user: true },
    });
  }

  findSiteCoach(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      include: { Coach: { include: { center: true } }, role: true },
    });
  }

  checkCoachOnSite(userId: string, siteId: string) {
    return this.prisma.coachOnCenter.findFirst({
      where: { AND: [{ userId }, { siteId }] },
    });
  }

  async isCoachRelatedToPlayer(userId: string, playerId: string) {
    const coachOnSite = await this.prisma.coachOnCenter.findFirst({
      where: {
        userId,
        center: {
          player: {
            some: {
              id: playerId,
            },
          },
        },
      },
    });

    return !!coachOnSite;
  }

  async remove(id: string) {
    const data = await this.prisma.coachOnCenter.delete({
      where: { userId: id },
    });
    return { message: 'user removed from site', data };
  }
}
