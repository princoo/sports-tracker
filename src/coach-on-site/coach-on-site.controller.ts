import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CoachOnSiteService } from './coach-on-site.service';
import { CreateCoachOnSiteDto } from './dto/create-coach-on-site.dto';
import { JwtGuard } from 'src/core/guards/jwt_guard.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { UserRoleEnum } from 'src/core/enums/roles.enum';

@UseGuards(
  JwtGuard,
  new RolesGuard([UserRoleEnum.HSO, UserRoleEnum.FOOTBALL_DIRECTOR]),
)
@Controller('coach-on-site')
export class CoachOnSiteController {
  constructor(private readonly coachOnSiteService: CoachOnSiteService) {}

  @Post()
  async create(@Body() createCoachOnSiteDto: CreateCoachOnSiteDto) {
    const data = await this.coachOnSiteService.create(createCoachOnSiteDto);
    return { message: 'Coach added to site successfully', data };
  }

  @Get()
  findAll() {
    return this.coachOnSiteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coachOnSiteService.findOne(id);
  }

  @Delete(':userId')
  remove(@Param('userId') userId: string) {
    return this.coachOnSiteService.remove(userId);
  }
}
