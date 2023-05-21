import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentMethodEntity } from '../../typeorm';
import { MidtransService } from '../../midtrans/midtrans.service';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentMethodEntity])],
  providers: [PaymentService, MidtransService],
  controllers: [PaymentController],
})
export class PaymentModule {}
