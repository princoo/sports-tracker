import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prismaClient/prisma.service';
import { TestService } from 'src/test/test.service';
import {
  validateMetrics,
  validateMetricsOnUpdate,
} from 'src/utility/validateTestInputs';

@Injectable()
export class PlayerTestService {
  constructor(
    private prisma: PrismaService,
    private testService: TestService,
  ) {}
  async create(
    testId: string,
    playerId: string,
    sessionId: string,
    recorderBy: string,
    requiredMetrics: string[],
    createPlayerTestDto: any,
  ) {
    validateMetrics(createPlayerTestDto, requiredMetrics);
    return this.prisma.$transaction(async (tx) => {
      const playerTest = await tx.playerTest.create({
        data: {
          playerId,
          testId,
          sessionId,
          recorderBy: recorderBy,
        },
      });
      await tx.testMetrics.create({
        data: { playerTestId: playerTest.id, ...createPlayerTestDto },
      });
      return { playerTest };
    });
  }

  findUnique(sessionId: string, testId: string, playerId: string) {
    return this.prisma.playerTest.findFirst({
      where: {
        sessionId,
        testId,
        playerId,
      },
    });
  }

  findAll() {
    return this.findAll();
  }
  findAllByPlayerId(playerId: string) {
    return this.prisma.playerTest.findMany({
      where: {
        playerId,
      },
    });
  }
  async findBySessionId(sessionId: string) {
    const groupedTests = await this.prisma.playerTest.groupBy({
      by: ['sessionId'], // Group by sessionId
      where: {
        sessionId, // Filter by the specific playerId
      },
      _count: {
        id: true, // Count of tests in each session
      },
      _avg: {
        results: true, // Average results (or any other metric you may want)
      },
      // inclue
    });
    console.log(groupedTests);
    // return this.prisma.playerTest.findMany({
    //   where: {
    //     sessionId,
    //   },
    // });
  }

  findOne(id: string) {
    return this.prisma.playerTest.findUnique({ where: { id } });
  }
  findOneTestMetricById(id: string) {
    return this.prisma.testMetrics.findUnique({
      where: { id },
      include: { playerTest: { include: { test: true } } },
    });
  }

  update(
    playerTestId: string,
    requiredMetrics: string[],
    updatePlayerTestDto: any,
  ) {
    validateMetricsOnUpdate(updatePlayerTestDto, requiredMetrics);
    return this.prisma.testMetrics.update({
      where: {
        id: playerTestId,
      },
      data: updatePlayerTestDto,
    });
  }

  remove(playerTestId: string) {
    return this.prisma.playerTest.delete({ where: { id: playerTestId } });
  }
}
