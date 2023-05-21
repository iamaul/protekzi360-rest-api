import { AppMetadataEntity } from './app-metadata.entity';
import { ScanEntity } from './scan.entity';
import { ThreatEntity } from './threat.entity';
import { UserMetadataEntity } from './user-metadata.entity';
import { UserEntity } from './user.entity';

const entities = [
  UserEntity,
  UserMetadataEntity,
  ScanEntity,
  AppMetadataEntity,
  ThreatEntity,
];

export {
  UserEntity,
  UserMetadataEntity,
  ScanEntity,
  AppMetadataEntity,
  ThreatEntity,
};
export default entities;
