import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PrismaService } from 'src/prismaClient/prisma.service';

@Injectable()
export class PlayersService {
  constructor(private prisma: PrismaService) {}
  create(createPlayerDto: CreatePlayerDto, siteId: string) {
    return this.prisma.player.create({
      data: { ...createPlayerDto, siteId },
    });
  }

  findAll() {
    return this.prisma.player.findMany();
  }

  findAllBySite(siteId: string) {
    return this.prisma.player.findMany({
      where: { siteId },
    });
  }

  findOne(playerId: string) {
    return this.prisma.player.findUnique({ where: { id: playerId } });
  }

  findPlayerCoach(playerId: string) {
    return this.prisma.player.findUnique({
      where: { id: playerId },
      include: { site: { include: { coaches: { include: { user: true } } } } },
    });
  }

  update(id: string, updatePlayerDto: UpdatePlayerDto) {
    return this.prisma.player.update({ where: { id }, data: updatePlayerDto });
  }

  remove(id: string) {
    return this.prisma.player.delete({ where: { id } });
  }
}
