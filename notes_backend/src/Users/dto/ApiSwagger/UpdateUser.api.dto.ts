import { applyDecorators } from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserResponseDto } from '../Response/User.response.dto.js';

export function ApiUpdateUser() {
  return applyDecorators(
    ApiCookieAuth(),
    ApiOperation({
      summary: 'Update user values',
      description:
        'Update users data into database',
    }),
    ApiResponse({
      status: 200,
      description: 'User was successfully updated into database',
      type: UserResponseDto,
    }),
    ApiNotFoundResponse({
      description: 'Invalid updated data (user(id) doesn`t have note(id) ',
      schema: {
        example: {
          message: 'User data is invalid',
          error: 'Bad Request',
          statusCode: 400,
        },
      },
    }),
    ApiUnauthorizedResponse({
      description: 'User is not authenticated or the session is invalid',
      schema: {
        example: {
          message: 'Authorization error',
          error: 'Unauthorized',
          statusCode: 401,
        },
      },
    }),
  );
}
