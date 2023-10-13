import { UserEntity, UserServiceTag } from '@domain';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [],
  providers: [
    {
      provide: UserServiceTag,
      useClass: UserService,
    },
  ],
  exports: [UserServiceTag],
})
export class UserModule {}
