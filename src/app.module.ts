import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { User } from './models/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.MODE ? true : false, // dev mode only
    }),
    TypeOrmModule.forFeature([User]),
  ],

  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
