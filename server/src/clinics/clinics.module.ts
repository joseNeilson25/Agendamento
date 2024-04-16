import { Module } from '@nestjs/common';
import { ClinicsService } from './clinics.service';
import { ClinicsController } from './clinics.controller';
import { PrismaService } from 'src/database/pisma.service';

@Module({
  controllers: [ClinicsController],
  providers: [ClinicsService, PrismaService],
})
export class ClinicsModule {}
