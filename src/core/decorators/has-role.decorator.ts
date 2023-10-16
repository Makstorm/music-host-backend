import { SetMetadata } from '@nestjs/common';
import { RoleType } from '../enums';

export const HasRole = (role: RoleType): any => SetMetadata('role', role);
