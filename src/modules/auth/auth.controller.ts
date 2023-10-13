import {
  AuthServiceTag,
  IAuthService,
  LoginDto,
  RegisterDto,
  UserAuth,
} from '@domain';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('AuthController')
@Controller('auth')
export class AuthController {
  @Inject(AuthServiceTag) private readonly service: IAuthService;

  @Post('register')
  public async register(@Body() dto: RegisterDto): Promise<void> {
    return await this.service.registration(dto);
  }

  @ApiResponse({
    type: UserAuth,
  })
  @Post('login')
  public async login(@Body() dto: LoginDto): Promise<UserAuth> {
    return await this.service.login(dto);
  }
}
