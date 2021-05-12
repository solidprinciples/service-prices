import { Pairs } from 'src/pairs/pairs.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Prices {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Pairs, { eager: true })
  pair: Pairs;

  @CreateDateColumn()
  lastUpdated: Date;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  price: number;

  @BeforeInsert()
  async touch() {
    this.lastUpdated = new Date();

    if (!this.createdAt) {
      this.createdAt = new Date();
    }
  }
}
