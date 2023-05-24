import { BadRequestException, Injectable } from '@nestjs/common';
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

  async createScan(
    scan: CreateScanDTO,
    request: ExtendedRequest,
  ): Promise<object> {
    const createdScan = this.scanRepo.create(scan);
    // Get the uid from the request's metadata
    const uid = request.uid;
    createdScan.userId = uid;

    const data = await this.scanRepo.save(createdScan);
    return {
      id: data.id,
    };
  }

  async updateScan(id: string, scan: ScanDTO): Promise<ScanDTO> {
    try {
      const updatedScan = await this.scanRepo.findOne({
        where: { id },
      });

      updatedScan.totalApp = scan.totalApp ?? updatedScan.totalApp;
      updatedScan.totalFile = scan.totalFile ?? updatedScan.totalFile;
      updatedScan.scanResult = scan.scanResult ?? updatedScan.scanResult;
      updatedScan.finished = scan.finished ?? updatedScan.finished;
      updatedScan.finishedDate = scan.finishedDate ?? updatedScan.finishedDate;
      updatedScan.read = scan.read ?? updatedScan.read;

      return this.scanRepo.save(updatedScan);
    } catch (error) {
      throw new BadRequestException('User not found');
    }
  }

  async getScanById(id: string): Promise<ScanDTO> {
    return this.scanRepo.findOne({
      where: { id },
    });
  }
}
