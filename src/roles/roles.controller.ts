import { Controller, Get, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { JwtGuard } from 'src/core/guards/jwt_guard.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { UserRoleEnum } from 'src/core/enums/roles.enum';

@Controller('roles')
export class RolesController {
  constructor(private readonly roleServices: RolesService) {}

  @Get('')
  @UseGuards(JwtGuard, new RolesGuard([UserRoleEnum.HSO]))
  async changeUserRole() {
    const data = await this.roleServices.getAllRoles();
    return { message: 'All roles retrieved', data };
  }
}
