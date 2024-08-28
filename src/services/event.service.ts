import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Event } from 'src/models/event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEventDTO } from 'src/dto/event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async findAll(): Promise<Event[]> {
    return await this.eventRepository.find();
  }

  async createEvent(createEventDto: CreateEventDTO): Promise<Event> {
    const newEvent = this.eventRepository.create(createEventDto);
    return this.eventRepository.save(newEvent);
  }
}
