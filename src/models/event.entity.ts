import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum EventCategory {
  MOVIE = 'movie',
  GAMING = 'gaming',
  BOOKS = 'books',
  ENG_CLUB = 'english club',
  OTHER = 'other',
}

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 250, nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: EventCategory,
    default: EventCategory.OTHER,
  })
  category: EventCategory;

  @Column({ type: 'int', width: 250 })
  membersAmount: number;

  @Column()
  location: string;

  @Column({ type: 'timestamptz' })
  date: Date;
}
