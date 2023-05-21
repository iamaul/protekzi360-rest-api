import { Body, Post, Controller, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { OPEN_API_CONSTANT } from '../common/open-api.constant';

const {
  modules: {
    AUTH: {
      tag: AUTH_TAG,
      endPoints: { CREATE_AUTH },
    },
  },
} = OPEN_API_CONSTANT;

@ApiTags(AUTH_TAG)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('')
  @HttpCode(200)
  @ApiOperation({
    summary: CREATE_AUTH.ApiOperation.title,
    description: CREATE_AUTH.ApiOperation.summary,
  })
  @ApiOkResponse({
    description: CREATE_AUTH.ApiOkResponse.description,
    type: AuthDTO,
  })
  @ApiBadRequestResponse({
    description: CREATE_AUTH.ApiBadRequestResponse.description,
  })
  @ApiInternalServerErrorResponse({
    description: CREATE_AUTH.ApiInternalServerErrorResponse.description,
  })
  createAuth(@Body() authRequest: AuthDTO): Promise<void> {
    return this.authService.createAuth(authRequest);
  }
}
