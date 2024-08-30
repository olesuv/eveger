import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateEventDTO } from 'src/dto/event.dto';
import { EventService } from 'src/services/event.service';
import EventErrorHandler from 'src/utils/eventErrorHandlers';
import { isUUID } from 'class-validator';

@Controller('events')
export class EventController {
  private eventErrorHandler: EventErrorHandler;

  constructor(private readonly eventService: EventService) {
    this.eventErrorHandler = new EventErrorHandler(eventService);
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

  @Get('/:uuid')
  async getEvent(@Param('uuid') uuid: string) {
    if (!isUUID(uuid)) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'invalid UUID format',
          message: 'the UUID provided is not valid',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const event = await this.eventService.getEvent(uuid);
    if (!event) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'invalid event data',
          message: 'event not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return event;
  }

  @Get()
  async getRecentEvents(
    @Query('amount') amount?: number,
    @Query('sortBy') sortBy?: string,
    @Query('filterBy') filterBy?: string,
    @Query('recent') recent?: string,
  ) {
    try {
      const recentEvents = await this.eventService.getEvents(
        amount,
        filterBy,
        sortBy,
        recent,
      );

      if (!recentEvents || recentEvents.length === 0) {
        throw new HttpException(
          {
            status: HttpStatus.NO_CONTENT,
            error: 'no events available',
            message: 'no events match the criteria',
          },
          HttpStatus.NO_CONTENT,
        );
      }

      return recentEvents;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'database error',
          message: 'an error occurred while accessing the database',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
