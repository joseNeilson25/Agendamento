import {
   Controller,
   Get,
   Post,
   Body,
   Patch,
   Param,
   Delete,
   Put,
 } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { Clinic } from './entities/clinic.entity';
import { ClinicsService } from './clinics.service';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { UpdateClinicDto } from './dto/update-clinic.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@IsPublic()
@ApiTags('clinics')
@Controller('clinics')
export class ClinicsController {
  constructor(private readonly clinicsService: ClinicsService) {}

  @Post()
  create(@Body() data: Prisma.ClinicCreateInput): Promise<Clinic> {
    return this.clinicsService.createClinic(data);
  }

  @Get()
  findAll(): Promise<Clinic[]> {
    return this.clinicsService.getClinices();
  }

  @Get(':id')
  getClinicById(@Param('id') id: string): Promise<Clinic | null> {
    return this.clinicsService.getClinicById(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Prisma.ClinicUpdateInput,
  ): Promise<Clinic> {
    return this.clinicsService.updateClinic(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Clinic> {
    return this.clinicsService.deleteClinic(id);
  }
}
