import { Test, TestingModule } from '@nestjs/testing';
import { ThreatController } from './threat.controller';

describe('ThreatController', () => {
  let controller: ThreatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThreatController],
    }).compile();

    controller = module.get<ThreatController>(ThreatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
