import { Injectable } from '@nestjs/common';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { PrismaService } from 'src/prismaClient/prisma.service';
import { UserRoleEnum } from 'src/core/enums/roles.enum';

@Injectable()
export class SiteService {
  constructor(private prisma: PrismaService) {}

  async create(createSiteDto: CreateSiteDto) {
    return await this.prisma.site.create({ data: createSiteDto });
  }
  // async create(createSiteDto: CreateSiteDto) {
  //   return await this.prisma.site.create({ data: createSiteDto });
  // }
  //  find all users with role coach whose siteId
  async findCoachesWithNoSite() {
    return await this.prisma.user.findMany({
      where: {
        role: {
          roleName: UserRoleEnum.COACH,
        },
        Coach: null,
      },
      select: {
        id: true,
        email: true,
        userName: true,
        role: true,
        profile: true,
      },
      // include: { role: true, profile: true },
    });
  }
  async findAll() {
    return this.prisma.site.findMany({
      include: {
        coaches: {
          select: {
            user: {
              select: {
                id: true,
                email: true,
                userName: true,
                role: { select: { roleName: true } },
                profile: {
                  select: {
                    nationality: true,
                    phone: true,
                    avatarId: true,
                    firstName: true,
                    lastName: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  findOne(siteName: string) {
    return this.prisma.site.findUnique({ where: { name: siteName } });
  }

  findById(siteId: string) {
    return this.prisma.site.findUnique({ where: { id: siteId } });
  }

  update(id: string, updateSiteDto: UpdateSiteDto) {
    return this.prisma.site.update({ where: { id }, data: updateSiteDto });
  }

  remove(id: string) {
    return this.prisma.site.delete({ where: { id } });
  }
}
