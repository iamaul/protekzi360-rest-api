import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScanEntity } from '../../typeorm';
import { Repository } from 'typeorm';
import { CreateScanDTO, ScanDTO } from './dto/scan.dto';
import { ExtendedRequest } from '../../common/extended-request';

@Injectable()
export class ScanService {
  constructor(
    @InjectRepository(ScanEntity)
    private readonly scanRepo: Repository<ScanEntity>,
  ) {}

  async createScan(scan: CreateScanDTO): Promise<string> {
    const createdScan = this.scanRepo.create(scan);
    await this.scanRepo.save(createdScan);
    return createdScan.id;
  }

  async updateScan(
    id: string,
    scan: ScanDTO,
    request: ExtendedRequest,
  ): Promise<ScanDTO> {
    // Get the uid from the request's metadata
    const uid = request.uid;

    const updatedScan = await this.scanRepo.findOne({
      where: { id },
    });
    updatedScan.userId = uid;
    updatedScan.totalApp = scan.totalApp ?? updatedScan.totalApp;
    updatedScan.totalFile = scan.totalFile ?? updatedScan.totalFile;
    updatedScan.scanResult = scan.scanResult ?? updatedScan.scanResult;
    updatedScan.finished = scan.finished ?? updatedScan.finished;
    updatedScan.finishedDate = scan.finishedDate ?? updatedScan.finishedDate;
    updatedScan.read = scan.read ?? updatedScan.read;
    return this.scanRepo.save(updatedScan);
  }

  async getScanById(id: string): Promise<ScanDTO> {
    return this.scanRepo.findOne({
      where: { id },
    });
  }
}
