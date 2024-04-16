import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { Booking } from './entities/booking.entity';
import { PrismaService } from 'src/database/pisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async createBooking(data: Prisma.BookingCreateInput): Promise<Booking> {
    return this.prisma.booking.create({
      data,
    });
  }

  async getBookinges(): Promise<Booking[]> {
    return this.prisma.booking.findMany();
  }

  async getBookingById(id: string): Promise<Booking | null> {
    return this.prisma.booking.findUnique({
      where: { id },
    });
  }

  async updateBooking(
    id: string,
    data: Prisma.BookingUpdateInput,
  ): Promise<Booking> {
    return this.prisma.booking.update({
      where: { id },
      data,
    });
  }

  async deleteBooking(id: string): Promise<Booking> {
    return this.prisma.booking.delete({
      where: { id },
    });
  }
}
