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
import { Service } from './entities/service.entity';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@IsPublic()
@ApiTags('services')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  create(@Body() data: Prisma.ServiceCreateInput): Promise<Service> {
    return this.servicesService.createService(data);
  }

  @Get()
  findAll(): Promise<Service[]> {
    return this.servicesService.getServicees();
  }

  @Get(':id')
  getServiceById(@Param('id') id: string): Promise<Service | null> {
    return this.servicesService.getServiceById(id);
  }

  @Get('service-clinic/:clinicId')
  getServiceByClinicId(@Param('clinicId') userId: string): Promise<Service[]> {
   return this.servicesService.getServiceByClinicId(userId);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Prisma.ServiceUpdateInput,
  ): Promise<Service> {
    return this.servicesService.updateService(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Service> {
    return this.servicesService.deleteService(id);
  }
}
