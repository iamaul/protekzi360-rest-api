import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryColumn('varchar', {
    length: 36,
    name: 'id',
  })
  id: string;

  @Column({
    nullable: false,
    default: '',
  })
  name: string;

  @Column({
    name: 'email',
    nullable: false,
    default: '',
  })
  email: string;

  @Column({
    name: 'phone_number',
    nullable: false,
    length: 20,
    default: '',
  })
  phoneNumber: string;

  @Column({
    name: 'is_premium',
    default: false,
  })
  isPremium: boolean;
}
