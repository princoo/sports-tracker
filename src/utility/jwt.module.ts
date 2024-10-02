import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from './jwt.service';
@Module({
  providers: [JwtService],
  exports: [JwtService],
  //   providers: [ConfigService],
})
export class JwtModule {}
