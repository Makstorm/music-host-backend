import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { randomUUID } from 'crypto';

export class CreateAlbumDto {
  @ApiProperty({
    type: String,
    description: 'Album/Single name',
    example: 'AM',
  })
  @IsNotEmpty()
  public name: string;

  @ApiProperty({
    type: String,
    description: 'Id of the album owner',
    example: randomUUID(),
  })
  @IsNotEmpty()
  public artistId: string;
}
