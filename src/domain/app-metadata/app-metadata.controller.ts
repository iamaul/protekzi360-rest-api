import { Controller, Get, HttpCode } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { OPEN_API_CONSTANT } from '../../common/open-api.constant';
import { AppMetadataService } from './app-metadata.service';
import { AppMetadataDTO } from './dto/app-metadata.dto';

const {
  modules: {
    APP_METADATA: {
      tag: APP_METADATA_TAG,
      endPoints: { GET_APP_METADATA },
    },
  },
} = OPEN_API_CONSTANT;

@ApiTags(APP_METADATA_TAG)
@Controller('app-metadata')
export class AppMetadataController {
  constructor(private readonly appMetadataService: AppMetadataService) {}

  @Get('')
  @HttpCode(200)
  @ApiOperation({
    summary: GET_APP_METADATA.ApiOperation.title,
    description: GET_APP_METADATA.ApiOperation.summary,
  })
  @ApiOkResponse({
    description: GET_APP_METADATA.ApiOkResponse.description,
    type: AppMetadataDTO,
  })
  @ApiBadRequestResponse({
    description: GET_APP_METADATA.ApiBadRequestResponse.description,
  })
  @ApiUnauthorizedResponse({
    description: GET_APP_METADATA.ApiUnauthorized.description,
  })
  @ApiInternalServerErrorResponse({
    description: GET_APP_METADATA.ApiInternalServerErrorResponse.description,
  })
  getAppMetaData(): Promise<AppMetadataDTO[]> {
    return this.appMetadataService.getAppMetaData();
  }
}
