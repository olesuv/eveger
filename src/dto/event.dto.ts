import { EventCategory } from 'src/models/event.entity';

export class CreateEventDTO {
  readonly title: string;
  readonly desciption: string;
  readonly category: EventCategory;
  readonly membersAmount: number;
  readonly location: string;
  readonly date: Date;
}
