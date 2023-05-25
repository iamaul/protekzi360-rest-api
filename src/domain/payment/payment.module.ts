import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentMethodEntity, UserPaymentEntity } from '../../typeorm';
import { ConfigFirebase } from '../../config/config.firebase';
import { MidtransService } from '../../midtrans/midtrans.service';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentMethodEntity, UserPaymentEntity])],
  providers: [PaymentService, MidtransService, ConfigFirebase],
  controllers: [PaymentController],
})
export class PaymentModule {}
