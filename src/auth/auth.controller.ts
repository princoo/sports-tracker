import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  // UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
// import { ResponseInterceptor } from 'src/interceptors/response/response.interceptor';
@Controller('auth')
// @UseInterceptors(ResponseInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  @UsePipes(new ValidationPipe())
  async signUp(@Body() createUserDto: CreateUserDto) {
    const data = await this.authService.register(createUserDto);
    return { message: 'Account registered successfull', data };
  }
}
