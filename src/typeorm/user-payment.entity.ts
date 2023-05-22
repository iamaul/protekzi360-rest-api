import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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

  @OneToOne(() => PaymentMethodEntity)
  @JoinColumn()
  paymentMethod: PaymentMethodEntity;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

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

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    name: 'created_at',
  })
  public createdAt: Date;

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
}
