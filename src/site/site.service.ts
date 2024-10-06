import { Injectable } from '@nestjs/common';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { PrismaService } from 'src/prismaClient/prisma.service';

@Injectable()
export class SiteService {
  constructor(private prisma: PrismaService) {}

  async create(createSiteDto: CreateSiteDto) {
    return await this.prisma.site.create({ data: createSiteDto });
  }

  async findAll() {
    return this.prisma.site.findMany();
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
