import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { randomUUID } from 'crypto';

export class UserTokenCreateDto {
  @ApiProperty({
    type: String,
    example: randomUUID(),
  })
  public id: string;

  @ApiProperty({
    type: String,
    description: 'Should be of email format',
    example: 'cool@email.com',
  })
  @IsEmail()
  @IsNotEmpty()
  public email: string;
}
