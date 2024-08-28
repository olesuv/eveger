import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { User } from './models/user.entity';

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
      synchronize: devMode(), // dev mode only
    }),
    TypeOrmModule.forFeature([Event, User]),
  ],

  controllers: [UserController, EventController],
  providers: [UserService, EventService],
})
export class AppModule {}
