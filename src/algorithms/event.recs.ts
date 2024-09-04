import { GetEventDTO } from 'src/dto/event.dto';
import { Event, EventCategory } from 'src/models/event.entity';
import { EventService } from 'src/services/event.service';
import LocationUtils from 'src/utils/location';

export default class EventRecs {
  private eventService: EventService;
  private userEvent: GetEventDTO;

  constructor(eventService: EventService, userEvent: GetEventDTO) {
    this.eventService = eventService;
    this.userEvent = userEvent;
  }

  private async sortByCategory() {
    if (
      ![
        EventCategory.BOOKS,
        EventCategory.ENG_CLUB,
        EventCategory.GAMING,
        EventCategory.MOVIE,
        EventCategory.OTHER,
      ].includes(this.userEvent.category)
    ) {
      return Error('no or wrong catrgory provided');
    }

    const categoryEvents = await this.eventService.getEvents(
      9,
      null,
      null,
      'true',
      this.userEvent.category,
    );

    return categoryEvents;
  }

  private async sortByDestination(events: Event[]) {
    if (!events || events.length === 0) {
      return Error('No events provided');
    }

    const locator = new LocationUtils();

    const userCoords = await locator.getLocationCoords(this.userEvent.location);
    if (userCoords instanceof Error) {
      return userCoords;
    }

    const eventsWithDistance = await Promise.all(
      events.map(async (event) => {
        const eventCoords = await locator.getLocationCoords(event.location);
        if (eventCoords instanceof Error) {
          return { event, distance: Infinity };
        }

        const distance = locator.getDistance(userCoords, eventCoords);

        return { event, distance };
      }),
    );

    const sortedEvents = eventsWithDistance.sort((a, b) => {
      const distanceA = typeof a.distance === 'number' ? a.distance : Infinity;
      const distanceB = typeof b.distance === 'number' ? b.distance : Infinity;
      return distanceA - distanceB;
    });

    if (!sortedEvents) {
      return 'no recommendations for current event';
    }

    return sortedEvents.map((item) => item.event);
  }

  public async getRecs() {
    const categoryEvents = await this.sortByCategory();
    if (categoryEvents instanceof Error) {
      console.error(categoryEvents.message);
      return;
    }

    return await this.sortByDestination(categoryEvents);
  }
}
