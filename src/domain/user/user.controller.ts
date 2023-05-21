import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO, UserMetadataDTO } from './dto/user.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { OPEN_API_CONSTANT } from '../../common/open-api.constant';
import { AuthGuard } from '../../guards/auth.guard';

const {
  modules: {
    USER: {
      tag: USER_TAG,
      endPoints: {
        CREATE_USER,
        GET_USERS,
        GET_USER,
        CREATE_USER_METADATA,
        UPDATE_USER_METADATA,
      },
    },
  },
} = OPEN_API_CONSTANT;

@ApiTags(USER_TAG)
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('')
  @HttpCode(200)
  @ApiOperation({
    summary: CREATE_USER.ApiOperation.title,
    description: CREATE_USER.ApiOperation.summary,
  })
  @ApiOkResponse({
    description: CREATE_USER.ApiOkResponse.description,
    type: UserDTO,
  })
  @ApiBadRequestResponse({
    description: CREATE_USER.ApiBadRequestResponse.description,
  })
  @ApiUnauthorizedResponse({
    description: CREATE_USER.ApiUnauthorized.description,
  })
  @ApiInternalServerErrorResponse({
    description: CREATE_USER.ApiInternalServerErrorResponse.description,
  })
  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  createUser(@Body() user: UserDTO, @Req() request: any): Promise<UserDTO> {
    return this.userService.createUser(user, request);
  }

  @Get('')
  @HttpCode(200)
  @ApiOperation({
    summary: GET_USERS.ApiOperation.title,
    description: GET_USERS.ApiOperation.summary,
  })
  @ApiOkResponse({
    description: GET_USERS.ApiOkResponse.description,
    type: UserDTO,
  })
  @ApiBadRequestResponse({
    description: GET_USERS.ApiBadRequestResponse.description,
  })
  @ApiUnauthorizedResponse({
    description: GET_USERS.ApiUnauthorized.description,
  })
  @ApiInternalServerErrorResponse({
    description: GET_USERS.ApiInternalServerErrorResponse.description,
  })
  @UseGuards(AuthGuard)
  getUsers(): Promise<UserDTO[]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: GET_USER.ApiOperation.title,
    description: GET_USER.ApiOperation.summary,
  })
  @ApiOkResponse({
    description: GET_USER.ApiOkResponse.description,
    type: UserDTO,
  })
  @ApiBadRequestResponse({
    description: GET_USER.ApiBadRequestResponse.description,
  })
  @ApiUnauthorizedResponse({
    description: GET_USER.ApiUnauthorized.description,
  })
  @ApiNotFoundResponse({
    description: GET_USER.ApiNotFoundResponse.description,
  })
  @ApiInternalServerErrorResponse({
    description: GET_USER.ApiInternalServerErrorResponse.description,
  })
  @UseGuards(AuthGuard)
  getUserById(@Param('id') id: string): Promise<any> {
    return this.userService.getUserById(id);
  }

  @Post('metadata')
  @HttpCode(200)
  @ApiOperation({
    summary: CREATE_USER_METADATA.ApiOperation.title,
    description: CREATE_USER_METADATA.ApiOperation.summary,
  })
  @ApiOkResponse({
    description: CREATE_USER_METADATA.ApiOkResponse.description,
    type: UserMetadataDTO,
  })
  @ApiBadRequestResponse({
    description: CREATE_USER_METADATA.ApiBadRequestResponse.description,
  })
  @ApiUnauthorizedResponse({
    description: CREATE_USER_METADATA.ApiUnauthorized.description,
  })
  @ApiInternalServerErrorResponse({
    description:
      CREATE_USER_METADATA.ApiInternalServerErrorResponse.description,
  })
  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  createUserMetaData(
    @Body() userMetaData: UserMetadataDTO,
  ): Promise<UserMetadataDTO> {
    return this.userService.createUserMetaData(userMetaData);
  }

  @Put('metadata')
  @HttpCode(200)
  @ApiOperation({
    summary: UPDATE_USER_METADATA.ApiOperation.title,
    description: UPDATE_USER_METADATA.ApiOperation.summary,
  })
  @ApiOkResponse({
    description: UPDATE_USER_METADATA.ApiOkResponse.description,
    type: UserMetadataDTO,
  })
  @ApiBadRequestResponse({
    description: UPDATE_USER_METADATA.ApiBadRequestResponse.description,
  })
  @ApiUnauthorizedResponse({
    description: UPDATE_USER_METADATA.ApiUnauthorized.description,
  })
  @ApiInternalServerErrorResponse({
    description:
      UPDATE_USER_METADATA.ApiInternalServerErrorResponse.description,
  })
  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  updateUserMetaData(
    @Param('id') id: string,
    @Body() userMetaData: UserMetadataDTO,
    @Req() request: any,
  ): Promise<UserMetadataDTO> {
    return this.userService.updateUserMetaData(id, userMetaData, request);
  }
}
