import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';

import axios from 'axios';
import EventRecs from 'src/algorithms/event.recs';
import { EventService } from 'src/services/event.service';
import { GetEventDTO } from 'src/dto/event.dto';

@Controller('recs')
export class RecsController {
  constructor(private readonly eventService: EventService) {}

  @Get('/:uuid')
  async getEventRecs(@Param('uuid') uuid: string) {
    let userEvent: GetEventDTO;

    try {
      const response = await axios.get<GetEventDTO>(
        `http://localhost:${process.env.PORT}/events/${uuid}`,
      );
      userEvent = response.data;
    } catch (error) {
      throw new HttpException(
        'Event with this uuid is not found',
        HttpStatus.NOT_FOUND,
      );
    }

    const recsManager = new EventRecs(this.eventService, userEvent);
    const recs = await recsManager.getRecs();

    return recs;
  }
}
