import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  // UsePipes,
  // ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto, LoginDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
// import { Request } from 'express';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  // @UsePipes(new ValidationPipe())
  async signUp(@Body() createUserDto: CreateUserDto) {
    const data = await this.authService.register(createUserDto);
    return { message: 'Account registered successfull', data };
  }

  @Post('login')
  // @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @UseGuards(LocalAuthGuard)
  async login(@Body() loginDto: LoginDto, @Req() req: any) {
    const token = await this.authService.login(req.user);
    return { message: 'logged in successfully', data: token };
  }
}
