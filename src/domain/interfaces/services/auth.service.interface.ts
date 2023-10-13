import { LoginDto, RegisterDto, UserAuth } from '../../models';

export interface IAuthService {
  login(dto: LoginDto): Promise<UserAuth>;
  registration(dto: RegisterDto): Promise<void>;
}
