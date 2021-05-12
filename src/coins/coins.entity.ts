import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['symbol'])
export class Coins {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  symbol: string;
}
