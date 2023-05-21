import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppMetadataEntity } from '../../typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppMetadataService {
  constructor(
    @InjectRepository(AppMetadataEntity)
    private readonly appMetaData: Repository<AppMetadataEntity>,
  ) {}

  async getAppMetaData(): Promise<AppMetadataEntity[]> {
    return this.appMetaData.find();
  }
}
