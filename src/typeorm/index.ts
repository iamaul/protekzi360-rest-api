import { AppMetadataEntity } from './app-metadata.entity';
import { PaymentMethodEntity } from './payment-method.entity';
import { ScanEntity } from './scan.entity';
import { ThreatEntity } from './threat.entity';
import { UserMetadataEntity } from './user-metadata.entity';
import { UserPaymentEntity } from './user-payment.entity';
import { UserEntity } from './user.entity';

const entities = [
  UserEntity,
  UserMetadataEntity,
  ScanEntity,
  AppMetadataEntity,
  ThreatEntity,
  PaymentMethodEntity,
  UserPaymentEntity,
];

export {
  UserEntity,
  UserMetadataEntity,
  ScanEntity,
  AppMetadataEntity,
  ThreatEntity,
  PaymentMethodEntity,
  UserPaymentEntity,
};
export default entities;
