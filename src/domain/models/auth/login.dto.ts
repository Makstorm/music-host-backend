import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ type: String })
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  public password: string;
}
