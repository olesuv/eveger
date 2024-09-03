import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EventController } from './controllers/event.controller';
import { EventService } from './services/event.service';
import { Event } from './models/event.entity';

import { dbString, devMode } from 'src/utils/processEnv';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: dbString(),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: devMode(), // dev option for migrating
    }),
    TypeOrmModule.forFeature([Event]),
  ],

  controllers: [EventController],
  providers: [EventService],
})
export class AppModule {}
