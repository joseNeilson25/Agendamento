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
import { Booking } from './entities/booking.entity';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@IsPublic()
@ApiTags('bookings')
@Controller('bookings')
export class BookingsController {

  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  create(@Body() data: Prisma.BookingCreateInput): Promise<Booking> {
    return this.bookingsService.createBooking(data);
  }

  @Get()
  findAll(): Promise<Booking[]> {
    return this.bookingsService.getBookinges();
  }

  @Get(':id')
  getBookingById(@Param('id') id: string): Promise<Booking | null> {
    return this.bookingsService.getBookingById(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Prisma.BookingUpdateInput,
  ): Promise<Booking> {
    return this.bookingsService.updateBooking(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Booking> {
    return this.bookingsService.deleteBooking(id);
  }
}
