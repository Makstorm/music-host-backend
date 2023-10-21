import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { randomUUID } from 'crypto';

export class UpdateSongDto {
  @ApiProperty({
    type: String,
    description: 'Song name',
    example: 'Do I Wanna know?',
  })
  @IsNotEmpty()
  public name: string;

  @ApiProperty({
    type: String,
    description: 'Belonging album',
    example: randomUUID(),
  })
  public albumId: string;
}
