import { Module } from '@nestjs/common';
import { SongController } from './song.controller';
import { SongService } from './song.service';
import { SongEntity, SongServiceTag } from '@domain';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [TypeOrmModule.forFeature([SongEntity]), StorageModule],
  controllers: [SongController],
  providers: [{ provide: SongServiceTag, useClass: SongService }],
})
export class SongModule {}
