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
import { JwtGuard } from 'src/core/guards/jwtguard/jwt_guard.guard';

class UserRole {
  @IsString()
  roleId: string;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('role/:userId') // change user role
  @UseGuards(JwtGuard)
  @UsePipes(new ValidationPipe())
  async changeUserRole(@Body() { roleId }: UserRole, @Param() userId: string) {
    const data = await this.usersService.changeUserRole(userId, roleId);
    return { message: 'User role changed successfully', data };
  }
}
