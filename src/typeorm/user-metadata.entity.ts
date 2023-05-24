import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('user_metadata')
export class UserMetadataEntity {
  @PrimaryColumn({
    name: 'user_id',
  })
  userId: string;

  @Column({
    nullable: false,
    name: 'appsflyer_id',
    default: '',
  })
  appsFlyerId: string;

  @Column({
    name: 'advertising_id',
    nullable: false,
    default: '',
  })
  advertisingId: string;

  @Column({
    name: 'fcm_token',
    nullable: false,
    default: '',
  })
  fcmToken: string;

  @OneToOne(() => UserEntity)
  user: UserEntity;
}
