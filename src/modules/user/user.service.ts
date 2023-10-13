import { IUserService, UserEntity } from '@domain';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService implements IUserService {
  @InjectRepository(UserEntity)
  private readonly repository: Repository<UserEntity>;

  public async findByEmail(email: string): Promise<UserEntity> {
    return await this.repository.findOne({ where: { email } });
  }
  public async isEmailTaken(email: string): Promise<boolean> {
    return await this.repository.exist({ where: { email } });
  }
  public async create(entity: Partial<UserEntity>): Promise<UserEntity> {
    return await this.repository.save(entity);
  }
}
