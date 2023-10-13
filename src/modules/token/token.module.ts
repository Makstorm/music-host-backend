import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenServiceTag } from '@domain';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.getOrThrow('JWT_SECRET'),
          signOptions: { expiresIn: '30d' },
        };
      },
    }),
  ],
  providers: [
    {
      provide: TokenServiceTag,
      useClass: TokenService,
    },
  ],
  exports: [TokenServiceTag],
})
export class TokenModule {}
