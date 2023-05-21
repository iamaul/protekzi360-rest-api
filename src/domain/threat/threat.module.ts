import { Module } from '@nestjs/common';
import { ThreatController } from './threat.controller';
import { ThreatService } from './threat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThreatEntity } from '../../typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ThreatEntity])],
  providers: [ThreatService],
  controllers: [ThreatController],
})
export class ThreatModule {}
