import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prismaClient/prisma.service';
import { BcryptService } from 'src/utility/bcrypt/bcrypt.service';
import { RolesService } from 'src/roles/roles.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly bcryptService: BcryptService,
    private readonly roleService: RolesService,
  ) {}

  async register(userData: CreateUserDto) {
    const hashedPass = await this.bcryptService.hashPassword(userData.password);
    const defaultRole = await this.roleService.getRoleByName('USER');
    const result = await this.prisma.user.create({
      data: {
        email: userData.email,
        userName: userData.username,
        password: hashedPass,
        roleId: defaultRole.id,
        profile: {
          create: {
            firstName: userData.firstName,
            lastName: userData.lastName,
            phone: userData.phone,
            nationality: userData.nationality,
            gender: userData.gender,
          },
        },
      },
      include: {
        profile: true,
      },
    });
    return result;
  }
}
