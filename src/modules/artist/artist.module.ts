import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistEntity, ArtistServiceTag } from '@domain';
import { ArtistService } from './artist.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistEntity])],
  controllers: [ArtistController],
  providers: [{ provide: ArtistServiceTag, useClass: ArtistService }],

  exports: [ArtistServiceTag],
})
export class ArtistModule {}
