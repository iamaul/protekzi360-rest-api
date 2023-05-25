import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('threat_list')
export class ThreatEntity {
  @PrimaryColumn({ name: 'id' })
  id: string;

  @Column({
    name: 'package_id',
    nullable: true,
    default: '',
    type: 'text',
  })
  packageId: string;

  @Column({
    name: 'category',
    nullable: true,
    default: '',
    type: 'text',
  })
  category: string;
}
