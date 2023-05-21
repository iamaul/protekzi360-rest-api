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

@Entity('scanner')
export class ScanEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'counter_id',
    type: 'integer',
    default: () => "nextval('scanner_counter_id_seq'::regclass)",
  })
  counterId: number;

  @OneToOne(() => UserEntity, { cascade: true })
  @JoinColumn({
    name: 'user_id',
  })
  userId: string;

  @Column({ type: 'timestamp with time zone', nullable: true })
  startDate: Date | null;

  @Column({
    name: 'finished_date',
    nullable: true,
    default: '',
    type: 'varchar',
  })
  finishedDate: string;

  @Column({
    name: 'total_app',
    nullable: false,
    default: 0,
    type: 'integer',
  })
  totalApp: number;

  @Column({
    name: 'total_file',
    nullable: false,
    default: 0,
    type: 'integer',
  })
  totalFile: number;

  @Column({
    name: 'scan_result',
    nullable: true,
    default: '',
    type: 'text',
  })
  scanResult: string;

  @Column({
    name: 'phone_brand',
    nullable: true,
    default: '',
    type: 'text',
  })
  phoneBrand: string;

  @Column({
    name: 'phone_model',
    nullable: true,
    default: '',
    type: 'text',
  })
  phoneModel: string;

  @Column({
    name: 'android_version',
    nullable: true,
    default: '',
    type: 'text',
  })
  androidVersion: string;

  @Column({
    name: 'sdk_version',
    nullable: true,
    default: '',
    type: 'text',
  })
  sdkVersion: string;

  @Column({
    name: 'readed',
    nullable: false,
    default: false,
    type: 'boolean',
  })
  read: boolean;

  @Column({
    name: 'finished',
    nullable: false,
    default: false,
    type: 'boolean',
  })
  finished: boolean;

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