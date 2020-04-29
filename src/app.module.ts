import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { NoteSpaceModule } from './note-space/note-space.module';

@Module({
  imports: [
      UsersModule,
      ConfigModule.forRoot({
        isGlobal: true
      }),
      TypeOrmModule.forRoot(),
      NoteSpaceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
