import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prismaClient/prisma.service';
import { RolesService } from 'src/roles/roles.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { BcryptService } from 'src/utility/bcrypt/bcrypt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    // private readonly configService: ConfigService,
    private readonly bcryptService: BcryptService,
    private readonly roleService: RolesService,
    private readonly userServices: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
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

  async validateUser(username: string, userPassword: string): Promise<any> {
    const user = await this.userServices.findByUsernameOrEmail(username);
    if (!user) throw new UnauthorizedException('User not found !');
    const isPasswordMatch = await this.bcryptService.comparePassword(
      userPassword,
      user.password,
    );
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Incorrect password');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, createdAt, updatedAt, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = user;
    const secret = this.configService.get<string>('JWT_SECRET');
    return {
      access_token: await this.jwtService.signAsync(payload, { secret }),
    };
  }

  async validateToken(token: string) {
    try {
      // Retrieve the secret from environment variables
      const secret = this.configService.get<string>('JWT_SECRET');

      // Verify and decode the token using the secret
      const decodedUser = this.jwtService.verify(token, { secret });
      const user = await this.userServices.getUserDetailsById(decodedUser.id);
      return user;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
