import { Test, TestingModule } from '@nestjs/testing';
import { ThreatService } from './threat.service';

describe('ThreatService', () => {
  let service: ThreatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThreatService],
    }).compile();

    service = module.get<ThreatService>(ThreatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
