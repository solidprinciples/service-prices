import { IsUrl } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Exchanges {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @IsUrl()
  @Column({ nullable: true })
  www: string;

  @IsUrl()
  @Column({ nullable: true })
  logo: string;

  @CreateDateColumn()
  lastUpdated: Date;
}
