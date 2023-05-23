import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('app_metadata')
export class AppMetadataEntity {
  @PrimaryGeneratedColumn('uuid')
  syntheticId: string;

  @Column({
    name: 'total_scan',
    nullable: false,
    default: 0,
    type: 'integer',
  })
  totalScan: number;

  @Column({
    name: 'total_virus',
    nullable: false,
    default: 0,
    type: 'integer',
  })
  totalVirus: number;
}
