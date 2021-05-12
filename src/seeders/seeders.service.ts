import { Injectable, Logger } from '@nestjs/common';
import { Coins } from 'src/coins/coins.entity';
import { Pairs } from 'src/pairs/pairs.entity';
import { getManager, Repository } from 'typeorm';
import * as ccxt from 'ccxt';

import { Exchanges } from '../exchanges/exchanges.entity';
import { seedCoins } from 'src/coins/coins.seeder';
import { seedPairs } from 'src/pairs/pairs.seeder';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SeedersService {
  private logger: Logger = new Logger('db-seeders');

  constructor(
    @InjectRepository(Exchanges)
    private exchanges: Repository<Exchanges>,
    @InjectRepository(Coins)
    private coins: Repository<Coins>,
    @InjectRepository(Pairs)
    private pairs: Repository<Pairs>,
  ) {}

  async seed() {
    this.setup();

    await this.clear();
    await this.count();

    await this.seedExchanges();
    await this.count();
  }

  async seedExchanges() {
    await this.seedExchange(new ccxt.bybit());
    // await this.seedExchange(new ccxt.binance());
    // await this.seedExchange(new ccxt.gemini());
  }

  async seedExchange(exchange: ccxt.Exchange) {
    const { name, urls } = exchange;
    const { logo, www } = urls;

    const markets = await exchange.fetchMarkets();
    const entity = this.exchanges.create({ name, logo, www });

    await this.exchanges.save(entity);
    await seedCoins(this.coins, markets);
    await seedPairs(this.pairs, this.coins, markets, entity);
  }

  async count() {
    this.logger.log(`There are ${await this.exchanges.count()} exchanges.`);
    this.logger.log(`There are ${await this.pairs.count()} pairs.`);
    this.logger.log(`There are ${await this.coins.count()} coins.`);
  }

  async clear() {
    this.logger.debug('Clearing service-prices data...');
    await this.exchanges.query('DELETE FROM pairs');
    await this.exchanges.query('DELETE FROM coins');
    await this.exchanges.query('DELETE FROM exchanges');
    this.logger.log('Done!');
  }

  setup() {
    this.exchanges = getManager().getRepository(Exchanges);
    this.pairs = getManager().getRepository(Pairs);
    this.coins = getManager().getRepository(Coins);
  }
}
