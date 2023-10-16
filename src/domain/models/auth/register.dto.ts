import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { RoleType } from '../../../core';

export class RegisterDto {
  @ApiProperty({
    type: String,
    description: 'Should be of email format',
    example: 'cool@email.com',
  })
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @ApiProperty({
    type: String,
    description: 'Shoud be of nickname format',
    example: 'Pt4shk4',
  })
  public userName: string;

  @ApiProperty({ type: String })
  @MinLength(8)
  @IsNotEmpty()
  public password: string;

  @ApiProperty({
    description: 'List of posible roles',
    enum: RoleType,
    isArray: false,
    example: RoleType.USER,
  })
  public role: RoleType;
}
