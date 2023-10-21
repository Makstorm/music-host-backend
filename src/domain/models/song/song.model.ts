import { randomUUID } from 'crypto';
import { SongEntity } from '../../entities';
import { ApiProperty } from '@nestjs/swagger';

export class SongModel {
  @ApiProperty({ type: String, example: randomUUID() })
  public id: string;

  @ApiProperty({ type: String, example: 'Arctic Monkeys' })
  public name: string;

  @ApiProperty({
    type: String,
    description: 'Belonging album ID',
    example: randomUUID(),
  })
  public albumId: string;

  public static formEntity(song: SongEntity): SongModel {
    if (!song) {
      return null;
    }

    const model = new SongModel();

    model.id = song.id;
    model.name = song.name;
    model.albumId = song.albumId;

    return model;
  }
}
