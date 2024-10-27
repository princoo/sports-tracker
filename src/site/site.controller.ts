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
import { SiteService } from './site.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { JwtGuard } from 'src/core/guards/jwt_guard.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { UserRoleEnum } from 'src/core/enums/roles.enum';

@Controller('site')
export class SiteController {
  constructor(private readonly siteService: SiteService) {}

  @Post()
  @UseGuards(
    JwtGuard,
    new RolesGuard([UserRoleEnum.HSO, UserRoleEnum.FOOTBALL_DIRECTOR]),
  )
  async create(@Body() createSiteDto: CreateSiteDto) {
    const data = await this.siteService.create(createSiteDto);
    return { message: 'site created successfully', data };
  }

  @Get()
  @UseGuards(
    JwtGuard,
    new RolesGuard([
      UserRoleEnum.HSO,
      UserRoleEnum.FOOTBALL_DIRECTOR,
      UserRoleEnum.CEO,
      UserRoleEnum.TECHNICIAN,
      UserRoleEnum.COACH,
    ]),
  )
  async findAll() {
    const data = await this.siteService.findAll();
    return { message: 'All sites retrieved', data };
  }

  @Get('free-coach')
  async findCoachesWithOnSite() {
    const data = await this.siteService.findCoachesWithNoSite();
    return { message: 'Coaches with no site retrieved', data };
  }

  @Get(':siteId')
  async findOne(@Param('siteId') siteId: string) {
    const data = await this.siteService.findById(siteId);
    return { message: 'site retrieved', data };
  }

  @Patch(':siteId')
  async update(
    @Param('siteId') siteId: string,
    @Body() updateSiteDto: UpdateSiteDto,
  ) {
    const data = await this.siteService.update(siteId, updateSiteDto);
    return { message: 'site updated', data };
  }

  @Delete(':siteId')
  async remove(@Param('siteId') siteId: string) {
    const data = await this.siteService.remove(siteId);
    return { message: 'site deleted', data };
  }
}
