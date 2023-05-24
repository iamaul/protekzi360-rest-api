import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('scanner')
export class ScanEntity {
  @PrimaryColumn({
    name: 'id',
  })
  id: string;

  @Column({
    name: 'counter_id',
    type: 'integer',
    default: () => "nextval('scanner_counter_id_seq'::regclass)",
  })
  counterId: number;

  @Column({
    name: 'user_id',
    nullable: true,
    default: '',
    type: 'varchar',
  })
  userId: string;

  @Column({
    type: 'timestamp with time zone',
    name: 'start_date',
    nullable: true,
  })
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

  @OneToOne(() => UserEntity)
  user: UserEntity;
}
