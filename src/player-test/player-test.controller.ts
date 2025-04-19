import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  Delete,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PlayerTestService } from './player-test.service';
import { JwtGuard } from 'src/core/guards/jwt_guard.guard';
import { UserRoleEnum } from 'src/core/enums/roles.enum';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { CheckCoachAssignedToSite } from 'src/core/interceptors/coachOnSite/checkCoachAssignedToSite.interceptor';
import { ActiveSessionGuard } from 'src/core/guards/player-test/activeSessionAvailable.guard copy';
import { CustomRequest } from 'src/core/interface/customRequest.interface';

@UseGuards(JwtGuard)
@Controller('player-test')
export class PlayerTestController {
  constructor(private readonly playerTestService: PlayerTestService) {}

  @Post(':siteId/:testId/:playerId')
  @UseGuards(new RolesGuard([UserRoleEnum.HSO, UserRoleEnum.COACH])) // change this HSO to technician
  @UseGuards(ActiveSessionGuard)
  @UseInterceptors(CheckCoachAssignedToSite)
  async create(
    @Request() req: CustomRequest,
    @Param('siteId') siteId: string,
    @Param('testId') testId: string,
    @Param('playerId') playerId: string,
    @Body() createPlayerTestDto: any,
  ) {
    const data = await this.playerTestService.create(
      testId,
      playerId,
      req.sessionId,
      req.user.id,
      req.requiredMetrics,
      createPlayerTestDto,
    );
    return { message: 'PlayerTest created successfully', data };
  }

  @Get()
  async findAll() {
    const data = await this.playerTestService.findAll();
    return { message: 'PlayerTests retrieved successfully', data };
  }

  @Get('player/:playerId')
  async findAllByPlayer(@Param('playerId') playerId: string) {
    const data = await this.playerTestService.findAllByPlayerId(playerId);
    return { message: 'PlayerTests for player retrieved successfully', data };
  }

  @Get('session/:sessionId')
  async findBySession(@Param('sessionId') sessionId: string) {
    const data = await this.playerTestService.findBySessionId(sessionId);
    return { message: 'PlayerTests for session retrieved successfully', data };
  }

  @Get(':playerTestId')
  findOne(@Param('playerTestId') playerTestId: string) {
    return this.playerTestService.findOne(playerTestId);
  }

  @Patch(':siteId/:testMetricId')
  @UseGuards(new RolesGuard([UserRoleEnum.TECHNICIAN, UserRoleEnum.COACH]))
  @UseGuards(ActiveSessionGuard)
  @UseInterceptors(CheckCoachAssignedToSite)
  async update(
    @Request() req: CustomRequest,
    @Param('testMetricId') testMetricId: string,
    @Body() updatePlayerTestDto: any,
  ) {
    const data = await this.playerTestService.update(
      testMetricId,
      req.requiredMetrics,
      updatePlayerTestDto,
    );
    return { message: 'Test Metrics uppdated successfully', data };
  }

  @Delete(':siteId/:playerTestId')
  @UseGuards(new RolesGuard([UserRoleEnum.HSO, UserRoleEnum.COACH])) // change this HSO to technician
  @UseGuards(ActiveSessionGuard)
  @UseInterceptors(CheckCoachAssignedToSite)
  async remove(@Param('playerTestId') playerTestId: string) {
    const data = await this.playerTestService.remove(playerTestId);
    return { message: 'PlayerTest deleted successfully', data };
  }
}
