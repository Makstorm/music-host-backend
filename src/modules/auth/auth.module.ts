import { Module } from '@nestjs/common';
import { UserModule } from '../user';
import { TokenModule } from '../token';
import { AuthServiceTag } from '@domain';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [UserModule, TokenModule],
  controllers: [AuthController],
  providers: [
    {
      provide: AuthServiceTag,
      useClass: AuthService,
    },
  ],
  exports: [],
})
export class AuthModule {}
