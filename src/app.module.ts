import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BcryptService } from './utility/bcrypt/bcrypt.service';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { PrismaModule } from './prismaClient/prisma.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from './utility/jwt.module';
import { SiteModule } from './site/site.module';
import { CoachOnSiteModule } from './coach-on-site/coach-on-site.module';
import { PlayersModule } from './players/players.module';
import { TestModule } from './test/test.module';
import { TestSessionModule } from './test-session/test-session.module';
import { PlayerTestModule } from './player-test/player-test.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // this will make it global without need to import it in every module
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    RolesModule,
    PrismaModule,
    UsersModule,
    JwtModule,
    SiteModule,
    CoachOnSiteModule,
    PlayersModule,
    TestModule,
    TestSessionModule,
    PlayerTestModule,
  ],
  controllers: [AppController],
  providers: [AppService, BcryptService],
})
export class AppModule {}
