import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { UserRoleEnum } from 'src/core/enums/roles.enum';
import { JwtGuard } from 'src/core/guards/jwt_guard.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { CheckCoachAssignedToSite } from 'src/core/interceptors/coachOnSite/checkCoachAssignedToSite.interceptor';
import { CheckPlayerCoach } from 'src/core/interceptors/coachOnSite/checkPlayerCoach.interceptor';

@UseGuards(JwtGuard)
@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post(':siteId')
  @UseGuards(new RolesGuard([UserRoleEnum.TECHNICIAN, UserRoleEnum.COACH]))
  @UseInterceptors(CheckCoachAssignedToSite)
  async create(
    @Body() createPlayerDto: CreatePlayerDto,
    @Param('siteId') siteId: string,
  ) {
    const date = new Date(createPlayerDto.dob);
    createPlayerDto.dob = date.toISOString();
    const data = await this.playersService.create(createPlayerDto, siteId);
    return { message: 'Player added successfully', data };
  }

  @Get()
  async findAll() {
    const data = await this.playersService.findAll();
    return { message: 'All players retrieved', data };
  }
  @Get(':siteId')
  // @UseInterceptors(CheckCoachAssignedToSite)
  async findAllBySite(@Param('siteId') siteId: string) {
    const data = await this.playersService.findAllBySite(siteId);
    return { message: 'Site players retrieved', data };
  }

  @Get(':playerId')
  async findOne(@Param('playerId') playerId: string) {
    const data = await this.playersService.findOne(playerId);
    return { message: 'Single player retrieved', data };
  }

  @Patch(':playerId')
  @UseGuards(new RolesGuard([UserRoleEnum.TECHNICIAN, UserRoleEnum.COACH]))
  @UseInterceptors(CheckPlayerCoach)
  async update(
    @Param('playerId') playerId: string,
    @Body() updatePlayerDto: UpdatePlayerDto,
  ) {
    const data = await this.playersService.update(playerId, updatePlayerDto);
    return { message: 'Player updated', data };
  }

  @Delete(':playerId')
  @UseGuards(new RolesGuard([UserRoleEnum.TECHNICIAN, UserRoleEnum.COACH]))
  @UseInterceptors(CheckPlayerCoach)
  async remove(@Param('playerId') playerId: string) {
    const data = await this.playersService.remove(playerId);
    return { message: 'Player removed', data };
  }
}
