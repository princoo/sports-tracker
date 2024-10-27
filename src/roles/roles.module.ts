import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { AuthService } from 'src/auth/auth.service';
import { BcryptService } from 'src/utility/bcrypt/bcrypt.service';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [RolesController],
  providers: [RolesService, AuthService, BcryptService, UsersService],
  exports: [RolesService],
})
export class RolesModule {}
