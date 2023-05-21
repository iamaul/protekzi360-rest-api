import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('threat_list')
export class ThreatEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'package_id',
    nullable: true,
    default: '',
    type: 'varchar',
  })
  packageId: string;

  @Column({
    name: 'category',
    nullable: true,
    default: '',
    type: 'varchar',
  })
  category: string;
}
