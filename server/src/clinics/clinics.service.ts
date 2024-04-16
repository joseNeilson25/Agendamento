import { Injectable } from '@nestjs/common';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { UpdateClinicDto } from './dto/update-clinic.dto';
import { PrismaService } from 'src/database/pisma.service';
import { Prisma } from '@prisma/client';
import { Clinic } from './entities/clinic.entity';

@Injectable()
export class ClinicsService {
  constructor(private prisma: PrismaService) {}

  async createClinic(data: Prisma.ClinicCreateInput): Promise<Clinic> {
    return this.prisma.clinic.create({
      data,
    });
  }

  async getClinices(): Promise<Clinic[]> {
    return this.prisma.clinic.findMany();
  }

  async getClinicById(id: string): Promise<Clinic | null> {
    return this.prisma.clinic.findUnique({
      where: { id },
    });
  }

  async updateClinic(
    id: string,
    data: Prisma.ClinicUpdateInput,
  ): Promise<Clinic> {
    return this.prisma.clinic.update({
      where: { id },
      data,
    });
  }

  async deleteClinic(id: string): Promise<Clinic> {
    return this.prisma.clinic.delete({
      where: { id },
    });
  }
}
