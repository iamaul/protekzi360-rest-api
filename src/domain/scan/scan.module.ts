import { Module } from '@nestjs/common';
import { ScanController } from './scan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScanEntity } from '../../typeorm';
import { ScanService } from './scan.service';
import { ConfigFirebase } from '../../config/config.firebase';

@Module({
  imports: [TypeOrmModule.forFeature([ScanEntity])],
  providers: [ScanService, ConfigFirebase],
  controllers: [ScanController],
})
export class ScanModule {}
