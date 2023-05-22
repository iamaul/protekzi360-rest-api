import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { OPEN_API_CONSTANT } from '../../common/open-api.constant';
import { ThreatService } from './threat.service';
import { ThreatDTO } from './dto/threat.dto';
import { ThreatEntity } from '../../typeorm';
import { AuthGuard } from '../../guards/auth.guard';

const {
  modules: {
    THREAT: {
      tag: THREAT_TAG,
      endPoints: { GET_THREAT_LIST },
    },
  },
} = OPEN_API_CONSTANT;

@ApiTags(THREAT_TAG)
@ApiBearerAuth()
@Controller('threat')
export class ThreatController {
  constructor(private readonly threatService: ThreatService) {}

  @Get('')
  @HttpCode(200)
  @ApiOperation({
    summary: GET_THREAT_LIST.ApiOperation.title,
    description: GET_THREAT_LIST.ApiOperation.summary,
  })
  @ApiOkResponse({
    description: GET_THREAT_LIST.ApiOkResponse.description,
    type: ThreatDTO,
  })
  @ApiBadRequestResponse({
    description: GET_THREAT_LIST.ApiBadRequestResponse.description,
  })
  @ApiUnauthorizedResponse({
    description: GET_THREAT_LIST.ApiUnauthorized.description,
  })
  @ApiInternalServerErrorResponse({
    description: GET_THREAT_LIST.ApiInternalServerErrorResponse.description,
  })
  @UseGuards(AuthGuard)
  getThreatList(): Promise<ThreatEntity[]> {
    return this.threatService.getThreatList();
  }
}
