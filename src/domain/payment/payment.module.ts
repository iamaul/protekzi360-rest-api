import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  PaymentMethodEntity,
  UserEntity,
  UserMetadataEntity,
  UserPaymentEntity,
} from '../../typeorm';
import { ConfigFirebase } from '../../config/config.firebase';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PaymentMethodEntity,
      UserPaymentEntity,
      UserMetadataEntity,
      UserEntity,
    ]),
  ],
  providers: [PaymentService, UserService, ConfigFirebase],
  controllers: [PaymentController],
})
export class PaymentModule {}
