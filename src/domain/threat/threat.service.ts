import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ThreatEntity } from '../../typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ThreatService {
  constructor(
    @InjectRepository(ThreatEntity)
    private readonly threatRepo: Repository<ThreatEntity>,
  ) {}

  async getThreatList(): Promise<ThreatEntity[]> {
    return this.threatRepo.find();
  }
}
