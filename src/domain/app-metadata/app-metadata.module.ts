import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppMetadataEntity } from 'src/typeorm';
import { AppMetadataService } from './app-metadata.service';
import { AppMetadataController } from './app-metadata.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AppMetadataEntity])],
  providers: [AppMetadataService],
  controllers: [AppMetadataController],
})
export class AppMetadataModule {}
