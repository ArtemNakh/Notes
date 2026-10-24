import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service.js';
import IUser from './user.interface.js';
import { User } from './user.entity.js';
import { SessionAuthGuard } from '../libs/Guards/SessionAuth.guard.js';
import { ApiUpdateUser } from './dto/ApiSwagger/UpdateUser.api.dto.js';
import { GetCurrentUser } from '../libs/Decorators/GetCurrentSession.js';
import { UpdateUserBodyDto } from './dto/Body/UpdateUser.body.dto.js';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dto/Response/User.response.dto.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('v1')
  async findAll(): Promise<IUser[]> {
    return this.usersService.findAll();
  }

  @Get('v1/email/:email')
  async findByEmail(@Param('email') email: string): Promise<User | null> {
    return this.usersService.findByEmail(email);
  }

  @Patch('v1/update')
  @UseGuards(SessionAuthGuard)
  @ApiUpdateUser()
  async updateNote(
    @Body() body: UpdateUserBodyDto,
    @GetCurrentUser() userId: number,
  ): Promise<UserResponseDto> {
    const { name, surname } = body;

    const updatedUser = await this.usersService.updateUser(userId, {
      name: name,
      surname: surname,
    });
    return plainToInstance(UserResponseDto, updatedUser, {
      excludeExtraneousValues: true,
    });
  }
}
