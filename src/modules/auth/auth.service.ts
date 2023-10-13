import {
  IAuthService,
  ITokenService,
  IUserService,
  LoginDto,
  RegisterDto,
  TokenServiceTag,
  UserAuth,
  UserEntity,
  UserServiceTag,
  UserTokenCreateDto,
} from '@domain';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService implements IAuthService {
  @Inject(UserServiceTag)
  private readonly userService: IUserService;

  @Inject(TokenServiceTag)
  private readonly tokenService: ITokenService;

  public async login(dto: LoginDto): Promise<UserAuth> {
    const user = await this.userService.findByEmail(dto.email);

    if (!user) {
      throw new NotFoundException(
        `Account with email ${dto.email} does not exist`,
      );
    }

    const comparePassword = await bcrypt.compare(
      dto.password,
      user.passwordHash,
    );
    if (!comparePassword) {
      throw new BadRequestException('Wrong credentials');
    }

    const userTokenDto = new UserTokenCreateDto();

    userTokenDto.id = user.id;

    userTokenDto.email = user.email;

    const token = await this.tokenService.generateJwt(userTokenDto);

    return new UserAuth(token);
  }

  public async registration(dto: RegisterDto): Promise<void> {
    const doesExists = await this.userService.isEmailTaken(dto.email);

    if (doesExists) {
      throw new BadRequestException(`Email ${dto.email} is already taken`);
    }

    const userEntity = new UserEntity();

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(dto.password, salt);

    userEntity.email = dto.email;
    userEntity.userName = dto.userName;
    userEntity.passwordHash = hashPassword;

    await this.userService.create(userEntity);
  }
}
