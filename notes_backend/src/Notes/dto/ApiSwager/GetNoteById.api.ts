import { applyDecorators } from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { NoteResponseDto } from '../Response/Note.response.dto.js';

export function ApiGetNoteById() {
  return applyDecorators(
    ApiCookieAuth(),
    ApiOperation({
      summary: 'Get note by id',
      description: 'Return note by note id ',
    }),
    ApiResponse({
      status: 200,
      description: 'note that user had',
      type: NoteResponseDto,
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
