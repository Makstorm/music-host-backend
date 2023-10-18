import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateAlbumDto {
  @ApiProperty({
    type: String,
    description: 'Album/Single name',
    example: 'AM',
  })
  @IsNotEmpty()
  public name: string;
}
