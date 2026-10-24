import { Expose, Type } from 'class-transformer';
import type IUser from '../../../Users/user.interface.js';
import { User } from '../../../Users/user.entity.js';

export class GetSessionResponseDto {
  // @Expose() message: string;

  @Expose()
  @Type(() => User)
  user: IUser;
}
