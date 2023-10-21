// import { FileInterceptor } from '@nestjs/platform-express';
import { ApiProperty } from '@nestjs/swagger';
// import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { randomUUID } from 'crypto';

export class UploadSongDto {
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

  // @ApiProperty({
  //   type: String,
  //   format: 'binary',
  //   description: 'The audio file to upload',
  // })
  // @Type(() => FileInterceptor('audio'))
  // public audio: Express.Multer.File;
}
