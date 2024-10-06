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

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.siteService.findById(id);
    return { message: 'site retrieved', data };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSiteDto: UpdateSiteDto) {
    const data = await this.siteService.update(id, updateSiteDto);
    return { message: 'site updated', data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.siteService.remove(id);
    return { message: 'site deleted', data };
  }
}
