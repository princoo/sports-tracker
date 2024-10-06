import {
  Body,
  Controller,
  Param,
  Patch,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IsString } from 'class-validator';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/core/guards/jwt_guard.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { UserRoleEnum } from 'src/core/enums/roles.enum';

class UserRole {
  @IsString()
  roleId: string;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('role/:userId')
  @UseGuards(JwtGuard, new RolesGuard([UserRoleEnum.HSO]))
  @UsePipes(new ValidationPipe())
  async changeUserRole(@Body() { roleId }: UserRole, @Param() params: any) {
    const data = await this.usersService.changeUserRole(params.userId, roleId);
    return { message: 'User role changed successfully', data };
  }
}
