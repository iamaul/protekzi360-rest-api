import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('payment_method')
export class PaymentMethodEntity {
  @PrimaryColumn('integer', { name: 'id' })
  id: number;

  @Column({
    name: 'payment_name',
    nullable: true,
    default: '',
    type: 'varchar',
  })
  paymentName: string;

  @Column({
    name: 'payment_type',
    nullable: true,
    default: '',
    type: 'varchar',
  })
  paymentType: string;

  @Column({
    name: 'payment_logo',
    nullable: true,
    default: '',
    type: 'varchar',
  })
  paymentLogo: string;

  @Column({
    name: 'payment_detail',
    nullable: true,
    default: '',
    type: 'varchar',
  })
  paymentDetail: string;
}
