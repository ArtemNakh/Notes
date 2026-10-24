import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserBodyDto {
  @ApiProperty({ description: 'Client`s name', example: 'Ivan' })
  @IsString({ message: 'Name must be string' })
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'user surname', example: 'Doe' })
  @IsString({ message: 'Surname must be string' })
  @IsOptional()
  surname?: string;
}
