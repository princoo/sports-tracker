import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IsString } from 'class-validator';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/core/guards/jwt_guard.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { UserRoleEnum } from 'src/core/enums/roles.enum';
import { CustomRequest } from 'src/core/interface/customRequest.interface';

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
  @Get('')
  @UseGuards(JwtGuard, new RolesGuard([UserRoleEnum.HSO]))
  // @UsePipes(new ValidationPipe())
  async getUsers(@Request() req: CustomRequest) {
    const data = await this.usersService.getAllUsers(req.user.id);
    return { message: 'All users retrieved', data };
  }
}
