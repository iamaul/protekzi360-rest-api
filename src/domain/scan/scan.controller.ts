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
import { ScanService } from './scan.service';
import { CreateScanDTO, ScanDTO } from './dto/scan.dto';
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
    SCAN: {
      tag: SCAN_TAG,
      endPoints: { CREATE_SCAN, UPDATE_SCAN, GET_SCAN },
    },
  },
} = OPEN_API_CONSTANT;

@ApiTags(SCAN_TAG)
@ApiBearerAuth()
@Controller('scan')
export class ScanController {
  constructor(private readonly scanService: ScanService) {}

  @Post('')
  @HttpCode(200)
  @ApiOperation({
    summary: CREATE_SCAN.ApiOperation.title,
    description: CREATE_SCAN.ApiOperation.summary,
  })
  @ApiOkResponse({
    description: CREATE_SCAN.ApiOkResponse.description,
    type: CreateScanDTO,
  })
  @ApiBadRequestResponse({
    description: CREATE_SCAN.ApiBadRequestResponse.description,
  })
  @ApiUnauthorizedResponse({
    description: CREATE_SCAN.ApiUnauthorized.description,
  })
  @ApiInternalServerErrorResponse({
    description: CREATE_SCAN.ApiInternalServerErrorResponse.description,
  })
  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  createScan(
    @Body() scan: CreateScanDTO,
    @Req() request: any,
  ): Promise<string> {
    return this.scanService.createScan(scan, request);
  }

  @Put('')
  @HttpCode(200)
  @ApiOperation({
    summary: UPDATE_SCAN.ApiOperation.title,
    description: UPDATE_SCAN.ApiOperation.summary,
  })
  @ApiOkResponse({
    description: UPDATE_SCAN.ApiOkResponse.description,
    type: ScanDTO,
  })
  @ApiBadRequestResponse({
    description: UPDATE_SCAN.ApiBadRequestResponse.description,
  })
  @ApiUnauthorizedResponse({
    description: UPDATE_SCAN.ApiUnauthorized.description,
  })
  @ApiNotFoundResponse({
    description: UPDATE_SCAN.ApiNotFoundResponse.description,
  })
  @ApiInternalServerErrorResponse({
    description: UPDATE_SCAN.ApiInternalServerErrorResponse.description,
  })
  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  updateScan(@Param('id') id: string, @Body() scan: ScanDTO): Promise<ScanDTO> {
    return this.scanService.updateScan(id, scan);
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: GET_SCAN.ApiOperation.title,
    description: GET_SCAN.ApiOperation.summary,
  })
  @ApiOkResponse({
    description: GET_SCAN.ApiOkResponse.description,
    type: ScanDTO,
  })
  @ApiBadRequestResponse({
    description: GET_SCAN.ApiBadRequestResponse.description,
  })
  @ApiUnauthorizedResponse({
    description: GET_SCAN.ApiUnauthorized.description,
  })
  @ApiNotFoundResponse({
    description: GET_SCAN.ApiNotFoundResponse.description,
  })
  @ApiInternalServerErrorResponse({
    description: GET_SCAN.ApiInternalServerErrorResponse.description,
  })
  @UseGuards(AuthGuard)
  getScanById(@Param('id') id: string): Promise<ScanDTO> {
    return this.scanService.getScanById(id);
  }
}
