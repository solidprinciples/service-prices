import { Injectable, Logger } from '@nestjs/common';
import { Exchanges } from 'src/exchanges/exchanges.entity';
import { MoreThan, Repository } from 'typeorm';
import { Prices } from './prices.entity';

@Injectable()
export class PricesService {
  private readonly logger = new Logger('prices-service');
  constructor(private readonly prices: Repository<Prices>) {}

  async createOrUpdatePrice(
    timestampMs: number,
    symbolName: string,
    exchange: Exchanges,
    current: number,
  ) {
    try {
    } catch (e) {}
  }

  async fetchPrices(
    timestampMs: number,
    symbolName: string,
    exchange: Exchanges,
  ) {
    try {
      const lastMinute = timestampMs - (timestampMs % 60000);
      const lastUpdated = MoreThan(lastMinute);

      return await this.prices.findOne({ where: { lastUpdated } });
    } catch (e) {
      Logger.error(`No prices exist yet for ts ${timestampMs}`);
    }
  }
}
