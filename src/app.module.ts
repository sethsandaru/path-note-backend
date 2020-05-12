import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { NoteSpaceModule } from './note-space/note-space.module';
import { NoteItemsModule } from './note-items/note-items.module';
import { NoteSpaceAccessModule } from './note-space-access/note-space-access.module';
import { NoteItemsGateway } from './gateways/note-items.gateway';

@Module({
  imports: [
      UsersModule,
      ConfigModule.forRoot({
        isGlobal: true
      }),
      TypeOrmModule.forRoot(),
      NoteSpaceModule,
      NoteItemsModule,
      NoteSpaceAccessModule,
  ],
  controllers: [AppController],
  providers: [AppService, NoteItemsGateway],
})

export class AppModule {}
