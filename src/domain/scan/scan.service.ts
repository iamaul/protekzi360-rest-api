import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScanEntity } from '../../typeorm';
import { Repository } from 'typeorm';
import { CreateScanDTO, CreateScanResponse, ScanDTO } from './dto/scan.dto';
import { ExtendedRequest } from '../../common/extended-request';

@Injectable()
export class ScanService {
  constructor(
    @InjectRepository(ScanEntity)
    private readonly scanRepo: Repository<ScanEntity>,
  ) {}

  async createScan(
    scan: CreateScanDTO,
    request: ExtendedRequest,
  ): Promise<CreateScanResponse> {
    const createdScan = this.scanRepo.create(scan);
    // Get the uid from the request's metadata
    const uid = request.uid;
    createdScan.userId = uid;

    const data = await this.scanRepo.save(createdScan);

    const result: CreateScanResponse = {
      id: data.id,
    };

    return result;
  }

  async updateScan(id: string, scan: ScanDTO): Promise<ScanDTO> {
    const data = await this.scanRepo.findOne({
      where: { id },
    });

    if (!data) {
      throw new NotFoundException(`Scan with id ${id} not found`);
    }

    const updatedScan: ScanDTO = {
      totalApp: scan.totalApp ?? data.totalApp,
      totalFile: scan.totalFile ?? data.totalFile,
      scanResult: scan.scanResult ?? data.scanResult,
      finished: scan.finished ?? data.finished,
      finishedDate: scan.finishedDate ?? data.finishedDate,
      read: scan.read ?? data.read,
    };

    const result = {
      id,
      ...updatedScan,
    };

    const response = await this.scanRepo.update({ id }, updatedScan);

    if (response.affected == 1) {
      return result;
    } else {
      throw new BadRequestException(`Something went wrong`);
    }
  }

  async getScanById(id: string): Promise<ScanDTO> {
    return this.scanRepo.findOne({
      where: { id },
    });
  }
}
