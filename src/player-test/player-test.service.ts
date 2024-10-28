import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
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
          recordedAt: moment().utc().format('YYYY-MM-DDTHH:mm:ss[Z]'),
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
    // const groupedTests = await this.prisma.playerTest.groupBy({
    //   by: ['playerId'], // Group by sessionId
    //   where: {
    //     sessionId, // Filter by the specific playerId
    //   },
    //   // _count: {
    //   //   metr: true, // Count of tests in each session
    //   // },
    //   // _avg: {
    //   //   results: true, // Average results (or any other metric you may want)
    //   // },
    //   // inclue
    // });
    // console.log(groupedTests);
    const playerTests = await this.prisma.playerTest.findMany({
      where: {
        sessionId,
      },
      include: {
        testSession: {
          select: {
            tests: { select: { test: { select: { id: true, name: true } } } },
          },
        },
        metrics: true,
        test: { select: { name: true } },
        player: { select: { firstName: true, lastName: true } },
      },
      orderBy: {
        recordedAt: 'desc',
      },
    });
    // Group the data by playerId
    const groupedByPlayer = playerTests.reduce((acc, playerTest) => {
      const playerId = playerTest.playerId;

      if (!acc[playerId]) {
        acc[playerId] = {
          playerId: playerId,
          player: playerTest.player,
          sessionTests: [...playerTest.testSession.tests],
          tests: [],
        };
      }

      // Filter out metrics where the value is null
      const filteredMetrics = playerTest.metrics.map((metric) => {
        const validMetrics = {};
        Object.keys(metric).forEach((key) => {
          if (metric[key] !== null && key !== 'id' && key !== 'playerTestId') {
            validMetrics[key] = metric[key];
          }
        });
        return validMetrics;
      });

      acc[playerId].tests.push({
        id: playerTest.id,
        testId: playerTest.testId,
        testName: playerTest.test.name,
        sessionId: playerTest.sessionId,
        metrics: filteredMetrics[0],
        results: playerTest.results,
        recordedAt: playerTest.recordedAt,
      });

      return acc;
    }, {});

    return Object.values(groupedByPlayer);
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
