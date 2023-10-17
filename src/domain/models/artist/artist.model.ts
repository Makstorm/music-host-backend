import { randomUUID } from 'crypto';
import { ArtistEntity } from '../../entities';
import { ApiProperty } from '@nestjs/swagger';

export class ArtistModel {
  @ApiProperty({ type: String, example: randomUUID() })
  public id: string;

  @ApiProperty({ type: String, example: 'Arctic Monkeys' })
  public name: string;

  @ApiProperty({
    type: String,
    example: 'indie rock, psychedelic rock, post-punk revival, garage rock',
  })
  public genre: string;

  public static formEntity(artist: ArtistEntity): ArtistModel {
    if (!artist) {
      return null;
    }

    const model = new ArtistModel();

    model.id = artist.id;
    model.name = artist.name;
    model.genre = artist.genre;

    return model;
  }
}
