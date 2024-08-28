import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { User } from './models/user.entity';

import { dbString, devMode } from 'utils/processEnv';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: dbString(),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: devMode(), // dev mode only
    }),
    TypeOrmModule.forFeature([User]),
  ],

  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
