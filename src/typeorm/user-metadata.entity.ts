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

@Entity('users_metadata')
export class UserMetadataEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => UserEntity, { cascade: true })
  @JoinColumn({
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

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    name: 'created_at',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    name: 'updated_at',
  })
  public updatedAt: Date;
}
