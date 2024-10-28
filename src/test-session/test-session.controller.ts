import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TestSessionService } from './test-session.service';
import { CreateTestSessionDto } from './dto/create-test-session.dto';
import { UpdateTestSessionDto } from './dto/update-test-session.dto';
import { UserRoleEnum } from 'src/core/enums/roles.enum';
import { JwtGuard } from 'src/core/guards/jwt_guard.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';

@UseGuards(JwtGuard)
@Controller('test-session')
export class TestSessionController {
  constructor(private readonly testSessionService: TestSessionService) {}

  @Post()
  @UseGuards(new RolesGuard([UserRoleEnum.HSO, UserRoleEnum.ADMIN]))
  async create(@Body() createTestSessionDto: CreateTestSessionDto) {
    const data = await this.testSessionService.create(createTestSessionDto);
    return { message: 'Session created successfully', data };
  }

  @Get('session/active')
  async findActive() {
    const data = await this.testSessionService.findActiveSessions();
    return { message: 'Active Session retrieved successfully', data };
  }

  @Get()
  async findAll() {
    const data = await this.testSessionService.findAll();
    return { message: 'Sessions retrieved successfully', data };
  }

  @Get(':sessionId')
  async findOne(@Param('sessionId') sessionId: string) {
    console.log(sessionId);
    const data = await this.testSessionService.findOne(sessionId);
    return { message: 'Session retrieved successfully', data };
  }
  @Patch(':sessionId')
  @UseGuards(new RolesGuard([UserRoleEnum.HSO, UserRoleEnum.ADMIN]))
  async update(
    @Param('sessionId') sessionId: string,
    @Body() updateTestSessionDto: UpdateTestSessionDto,
  ) {
    const data = await this.testSessionService.update(
      sessionId,
      updateTestSessionDto,
    );
    return { message: 'Sessions updated successfully', data };
  }

  @Delete(':sessionId')
  async remove(@Param('sessionId') sessionId: string) {
    const data = await this.testSessionService.remove(sessionId);
    return { message: 'Sessions deleted successfully', data };
  }
}
