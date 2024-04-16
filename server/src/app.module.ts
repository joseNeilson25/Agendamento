import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { FileController } from './files.controller';
import { PrismaModule } from './prisma/prisma.module';
import { MulterModule } from '@nestjs/platform-express';
import { PrismaService } from './database/pisma.service';
import { ClinicsModule } from './clinics/clinics.module';
import { BookingsModule } from './bookings/bookings.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [UserModule, PrismaModule, AuthModule,
    MulterModule.register({
      dest: './uploads',
    }),
    ClinicsModule,
    ServicesModule,
    BookingsModule],
  controllers: [AppController, FileController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    PrismaService,
  ],
})
export class AppModule {}
