import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
// import { PrismaService } from './prismaClient/prisma.service';
import { BcryptService } from './utility/bcrypt/bcrypt.service';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { PrismaModule } from './prismaClient/prisma.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true, // this will make it global without need to import it in every module
    }),
    RolesModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService, BcryptService],
})
export class AppModule {}
