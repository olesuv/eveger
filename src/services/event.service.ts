import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Event } from 'src/models/event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEventDTO } from 'src/dto/event.dto';
import { decodeLocation } from 'src/utils/location';
import * as geolib from 'geolib';

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

  async checkDate(createEventDto: CreateEventDTO): Promise<Boolean> {
    const same = await this.eventRepository.findBy({
      date: createEventDto.date,
    });

    return same.length > 0;
  }

  async getEvent(eventId: string): Promise<Event> {
    const event = await this.eventRepository.findOneBy({ uuid: eventId });
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event;
  }

  async getEvents(
    amount?: number,
    filterBy?: string,
    sortBy?: string,
    recent?: string,
    category?: string,
  ): Promise<Event[]> {
    let query = this.eventRepository.createQueryBuilder('event');

    if (category) {
      query = query.where('event.category = :category', { category });
    }

    if (recent === 'true' || recent === 'True') {
      const today = new Date();
      query = query.andWhere('event.date >= :today', { today });
    }

    if (filterBy) {
      query = query.where('event.someField = :filterBy', { filterBy });
    }

    query = query.orderBy(sortBy ? `event.${sortBy}` : 'event.date', 'ASC');

    if (amount) {
      query = query.limit(amount);
    }

    return await query.getMany();
  }

  async updateEvent(uuid: string, newUserEvent: Event): Promise<Event> {
    let eventToUpdate = await this.eventRepository.findOneBy({ uuid: uuid });
    if (!eventToUpdate) {
      throw new NotFoundException('Event not found');
    }

    eventToUpdate = newUserEvent;
    return await this.eventRepository.save(eventToUpdate);
  }
}
