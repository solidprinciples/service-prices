import { Coins } from 'src/coins/coins.entity';
import { Exchanges } from 'src/exchanges/exchanges.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pairs {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  symbol: string;

  @Column()
  name: string;

  @ManyToOne(() => Coins, { eager: true })
  base: Coins;

  @ManyToOne(() => Coins, { eager: true })
  quote: Coins;

  @ManyToOne(() => Exchanges, { eager: true })
  exchange: Exchanges;
}
