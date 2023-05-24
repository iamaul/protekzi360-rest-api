import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScanEntity } from '../../typeorm';
import { Repository } from 'typeorm';
import { CreateScanDTO, ScanDTO, CreateScanResponse } from './dto/scan.dto';
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
    return data;
  }

  async updateScan(id: string, scan: ScanDTO): Promise<ScanDTO> {
    const data = await this.scanRepo.findOne({
      where: { id },
    });

    if (!data) {
      throw new NotFoundException(`Scan with id ${id} not found`);
    }

    const updatedScan = new ScanDTO();

    updatedScan.totalApp = scan.totalApp ?? data.totalApp;
    updatedScan.totalFile = scan.totalFile ?? data.totalFile;
    updatedScan.scanResult = scan.scanResult ?? data.scanResult;
    updatedScan.finished = scan.finished ?? data.finished;
    updatedScan.finishedDate = scan.finishedDate ?? data.finishedDate;
    updatedScan.read = scan.read ?? data.read;

    const result = await this.scanRepo.update(id, updatedScan);
    return result.raw;
  }

  async getScanById(id: string): Promise<ScanDTO> {
    return this.scanRepo.findOne({
      where: { id },
    });
  }
}
