import { randomUUID } from 'crypto';
import { AlbumsEntity } from '../../entities';
import { ApiProperty } from '@nestjs/swagger';

export class AlbumModel {
  @ApiProperty({ type: String, example: randomUUID() })
  public id: string;

  @ApiProperty({ type: String, example: 'Arctic Monkeys' })
  public name: string;

  @ApiProperty({
    type: String,
    description: 'Id of the album owner',
    example: randomUUID(),
  })
  public artistId: string;

  public static formEntity(album: AlbumsEntity): AlbumModel {
    if (!album) {
      return null;
    }

    const model = new AlbumModel();

    model.id = album.id;
    model.name = album.name;
    model.artistId = album.artistId;

    return model;
  }
}
