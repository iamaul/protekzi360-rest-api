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
    type: 'varchar',
    name: 'payment_method_id',
  })
  paymentMethodId: string;

  @Column({
    type: 'varchar',
    name: 'user_id',
  })
  userId: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  code: string;

  @Column({ type: 'decimal', precision: 20, scale: 2, default: 0 })
  amount: number;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: 'pending',
  })
  status: PaymentStatus;

  @Column({ type: 'json', default: {} })
  meta: any;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'expired_at',
  })
  expiredAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @OneToOne(() => PaymentMethodEntity)
  paymentMethod: PaymentMethodEntity;

  @OneToOne(() => UserEntity)
  user: UserEntity;
}
