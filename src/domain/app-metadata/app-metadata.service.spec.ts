import { Test, TestingModule } from '@nestjs/testing';
import { AppMetadataService } from './app-metadata.service';

describe('AppMetadataService', () => {
  let service: AppMetadataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppMetadataService],
    }).compile();

    service = module.get<AppMetadataService>(AppMetadataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
