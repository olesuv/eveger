import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateEventDTO } from 'src/dto/event.dto';
import { EventService } from 'src/services/event.service';
import EventErrorHandler from 'src/utils/eventErrorHandlers';

@Controller('events')
export class EventController {
  private eventErrorHandler: EventErrorHandler;

  constructor(private readonly eventService: EventService) {
    this.eventErrorHandler = new EventErrorHandler(eventService);
  }

  @Get()
  async findAll() {
    return this.eventService.findAll();
  }

  @Post('/event')
  async newEvent(@Body() createEventDTO: CreateEventDTO) {
    const errors =
      await this.eventErrorHandler.verifyCreateEvent(createEventDTO);
    if (errors) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'invalid event data',
          message: errors.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.eventService.createEvent(createEventDTO);
  }
}
