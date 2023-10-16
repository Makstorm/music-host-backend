import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { randomUUID } from 'crypto';
import { RoleType } from 'src/core';

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

  @ApiProperty({
    description: 'List of posible roles',
    enum: RoleType,
    isArray: false,
    example: RoleType.USER,
  })
  public role: RoleType;
}
