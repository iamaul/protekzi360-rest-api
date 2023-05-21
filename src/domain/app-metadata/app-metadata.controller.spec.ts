import { Test, TestingModule } from '@nestjs/testing';
import { AppMetadataController } from './app-metadata.controller';

describe('AppMetadataController', () => {
  let controller: AppMetadataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppMetadataController],
    }).compile();

    controller = module.get<AppMetadataController>(AppMetadataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
