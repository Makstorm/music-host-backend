import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumServiceTag, AlbumsEntity } from '@domain';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumsEntity])],
  controllers: [AlbumController],
  providers: [{ provide: AlbumServiceTag, useClass: AlbumService }],

  exports: [AlbumServiceTag],
})
export class AlbumModule {}
