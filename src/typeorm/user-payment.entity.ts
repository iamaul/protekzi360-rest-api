import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { PaymentStatus } from '../common/enum';
import { PaymentMethodEntity } from './payment-method.entity';

@Entity('user_payment')
export class UserPaymentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'integer',
    name: 'payment_method_id',
  })
  paymentMethodId: number;

  @Column({
    type: 'text',
    name: 'user_id',
  })
  userId: string;

  @Column({
    type: 'text',
    name: 'va_name',
  })
  va_name: string;

  @Column({
    type: 'text',
    name: 'va_code',
  })
  va_code: string;

  @Column({ type: 'integer', name: 'amount' })
  amount: number;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status: PaymentStatus;

  @Column({
    type: 'timestamptz',
    name: 'expired_at',
  })
  expiredAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToOne(() => PaymentMethodEntity)
  paymentMethod: PaymentMethodEntity;

  @OneToOne(() => UserEntity)
  user: UserEntity;
}
