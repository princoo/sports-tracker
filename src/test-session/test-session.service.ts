import { BadRequestException, Injectable } from '@nestjs/common';
import { TestSession } from '@prisma/client';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CreateTestSessionDto } from './dto/create-test-session.dto';
import { UpdateTestSessionDto } from './dto/update-test-session.dto';
import { PrismaService } from 'src/prismaClient/prisma.service';

export enum SessionStatus {
  SCHEDULED = 'SCHEDULED',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
}
@Injectable()
export class TestSessionService {
  constructor(private prisma: PrismaService) {}

  async create(createTestSessionDto: CreateTestSessionDto) {
    const { tests, date } = createTestSessionDto;
    const currentDate = new Date().toISOString();
    const sessionDate = new Date(date).toISOString();

    // Check if the provided test IDs exist
    const existingTests = await this.prisma.test.findMany({
      where: {
        id: {
          in: tests,
        },
      },
      select: {
        id: true,
      },
    });
    // Check if all test IDs are valid
    if (existingTests.length !== tests.length) {
      throw new BadRequestException(
        'Some of the test IDs provided are invalid.',
      );
    }
    // Check if the date is in the past
    if (sessionDate.split('T')[0] < currentDate.split('T')[0]) {
      throw new BadRequestException(
        'The session date must be today or in the future.',
      );
    }
    let isActive = false;
    let status = SessionStatus.SCHEDULED;
    if (sessionDate.split('T')[0] === currentDate.split('T')[0]) {
      isActive = true;
      status = SessionStatus.ACTIVE;
    }

    const result = await this.prisma.$transaction(async (tx) => {
      const testSession = await tx.testSession.create({
        data: {
          date: sessionDate,
          isActive,
          status,
        },
      });
      await tx.sessionTests.createMany({
        data: existingTests.map((testId) => ({
          sessionId: testSession.id,
          testId: testId.id,
        })),
      });
      return testSession;
    });
    return result;
  }

  findAll() {
    return this.prisma.testSession.findMany({ include: { tests: true } });
  }

  findOne(id: string) {
    return this.prisma.testSession.findUnique({
      where: { id },
      include: { tests: true },
    });
  }
  findActive(date: string) {
    return this.prisma.testSession.findMany({
      where: {
        isActive: true,
        status: SessionStatus.ACTIVE,
        date: new Date(date),
      },
    });
  }
  findOnSameDay(date: string) {
    return this.prisma.testSession.findMany({
      where: { date: new Date(date).toISOString() },
    });
  }

  async update(id: string, updateTestSessionDto: UpdateTestSessionDto) {
    const { tests, date } = updateTestSessionDto;
    let existingTests: { id: string }[] = [];
    const isActive = false;
    const status = SessionStatus.SCHEDULED;

    if (tests && tests.length > 0) {
      existingTests = await this.prisma.test.findMany({
        where: {
          id: {
            in: tests,
          },
        },
        select: {
          id: true,
        },
      });

      if (existingTests.length !== tests.length) {
        throw new BadRequestException(
          'Some of the test IDs provided are invalid.',
        );
      }
    }

    const currentDate = new Date().toISOString();
    return this.prisma.$transaction(async (tx) => {
      // Handle updates to the TestSession
      const updateData: Partial<TestSession> = {};
      if (date) {
        const sessionDate = new Date(date).toISOString();
        if (sessionDate.split('T')[0] < currentDate.split('T')[0]) {
          throw new BadRequestException(
            'The session date must be today or in the future.',
          );
        }
        const sessionDateExists = await this.prisma.testSession.findFirst({
          where: {
            date: {
              equals: sessionDate,
            },
          },
        });
        if (sessionDateExists) {
          throw new BadRequestException('The session date already exists.');
        }
        updateData.date = sessionDate as unknown as Date; // Include the new date
      }

      // Update the TestSession
      updateData.isActive = isActive;
      updateData.status = status;

      const updatedSession = await tx.testSession.update({
        where: { id },
        data: updateData,
        include: {
          tests: true, // Include the tests in the updated session if needed
        },
      });

      // Handle the update of tests
      if (tests) {
        // Delete existing tests for this session
        await tx.sessionTests.deleteMany({
          where: {
            sessionId: id,
          },
        });

        // Create new SessionTests records
        await tx.sessionTests.createMany({
          data: existingTests.map((test) => ({
            sessionId: id,
            testId: test.id,
          })),
        });
      }
      return updatedSession;
    });
  }

  remove(id: string) {
    return this.prisma.testSession.delete({ where: { id } });
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleSessionExpiration() {
    const currentDate = new Date();
    const dateOnly = currentDate.toISOString().split('T')[0];
    const dateWithIsoTime = new Date(dateOnly);
    const deactivatedResults = await this.prisma.testSession.updateMany({
      where: {
        isActive: true,
        status: SessionStatus.ACTIVE,
        date: {
          lt: dateWithIsoTime.toISOString(),
        },
      },
      data: {
        isActive: false,
        status: SessionStatus.COMPLETED,
      },
    });
    const activatedResults = await this.prisma.testSession.updateMany({
      where: {
        isActive: false,
        status: SessionStatus.SCHEDULED,
        date: {
          equals: dateWithIsoTime.toISOString(),
        },
      },
      data: {
        isActive: true,
        status: SessionStatus.ACTIVE,
      },
    });
    console.log({
      deactivatedResults,
      activatedResults,
    });
  }
}
