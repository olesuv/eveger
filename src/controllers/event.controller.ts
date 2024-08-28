import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateEventDTO } from 'src/dto/event.dto';
import { EventService } from 'src/services/event.service';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  async findAll() {
    return this.eventService.findAll();
  }

  @Post('/event')
  async newEvent(@Body() createEventDTO: CreateEventDTO) {
    return this.eventService.createEvent(createEventDTO);
  }
}
