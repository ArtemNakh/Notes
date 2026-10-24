import { ApiProperty } from '@nestjs/swagger';
import IUser from '../../user.interface.js';
import { Expose } from 'class-transformer';

export class UserResponseDto implements Omit<
  IUser,
  'password' | 'notes' | 'isVerified'
> {
  @ApiProperty({ example: 11, description: 'Unique code object' })
  @Expose()
  id: number;

  @ApiProperty({ description: 'Ім’я користувача', example: 'Ivan' })
  @Expose()
  name: string;

  @ApiProperty({ description: 'Прізвище користувача', example: 'Doe' })
  @Expose()
  surname: string;

  @ApiProperty({
    description: 'Електронна пошта користувача',
    example: 'john.doe@example.com',
  })
  @Expose()
  email: string;

  @ApiProperty({
    example: '2026-09-25T10:49:48.000Z',
    description: 'Сreation date',
  })
  @Expose()
  created_at: Date;

  @ApiProperty({
    example: '2026-09-25T10:49:48.000Z',
    description: 'Update date',
  })
  @Expose()
  updated_at: Date;
}
