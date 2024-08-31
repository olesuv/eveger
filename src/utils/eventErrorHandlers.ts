import { CreateEventDTO } from 'src/dto/event.dto';
import { EventCategory } from 'src/models/event.entity';
import { EventService } from 'src/services/event.service';

export default class EventErrorHandler {
  constructor(private readonly eventService: EventService) {}

  public async verifyCreateEvent(eventDto: CreateEventDTO) {
    if (eventDto.title === '' || eventDto.title.length === 0) {
      return Error('field title shold have more than one character');
    }
    if (eventDto.title.length > 100) {
      return Error('field title should not have more than 100 characters');
    }

    if (eventDto.desciption?.length > 250) {
      return Error('buy premium to write more than 250 characters description');
    }

    if (
      ![
        EventCategory.BOOKS,
        EventCategory.ENG_CLUB,
        EventCategory.GAMING,
        EventCategory.MOVIE,
        EventCategory.OTHER,
      ].includes(eventDto.category)
    ) {
      return Error(
        `use only supported event categories: 'movie', 'gaming', 'books', 'english club', 'other'`,
      );
    }

    if (eventDto.membersAmount > 250) {
      return Error(`events with more than 250 people are not allowed`);
    }

    if (await this.eventService.checkDate(eventDto)) {
      return Error('somebody already chosed your preferable date');
    }
  }
}
