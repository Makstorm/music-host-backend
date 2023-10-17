import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateArtistDto {
  @ApiProperty({
    type: String,
    description: 'Artist/Group name',
    example: 'Artic Monkeys',
  })
  @IsNotEmpty()
  public name: string;

  @ApiProperty({
    type: String,
    description: 'A little information about artist',
    example:
      'British rock band formed in 2002 in High Green, a suburb of Sheffield',
  })
  @IsNotEmpty()
  public biography: string;

  @ApiProperty({
    type: String,
    description: 'music genre',
    example: 'indie rock, psychedelic rock, post-punk revival, garage rock',
  })
  @IsNotEmpty()
  public genre: string;
}
