import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/pisma.service';
import { Service } from './entities/service.entity';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async createService(data: Prisma.ServiceCreateInput): Promise<Service> {
    return this.prisma.service.create({
      data,
    });
  }

  async getServicees(): Promise<Service[]> {
    return this.prisma.service.findMany();
  }

  async getServiceById(id: string): Promise<Service | null> {
    return this.prisma.service.findUnique({
      where: { id },
    });
  }

  async updateService(
    id: string,
    data: Prisma.ServiceUpdateInput,
  ): Promise<Service> {
    return this.prisma.service.update({
      where: { id },
      data,
    });
  }

  async deleteService(id: string): Promise<Service> {
    return this.prisma.service.delete({
      where: { id },
    });
  }
}
