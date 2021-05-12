import { Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Pairs } from './pairs.entity';
import * as ccxt from 'ccxt';
import { Coins } from 'src/coins/coins.entity';
import { seedCoin } from 'src/coins/coins.seeder';
import { Exchanges } from 'src/exchanges/exchanges.entity';

const pairsMap = new Map<string, Pairs>();

export async function seedPair(
  pairs: Repository<Pairs>,
  coins: Repository<Coins>,
  market: ccxt.Market,
  exchange: Exchanges,
) {
  const {
    symbol,
    info: { name, alias },
  } = market;
  if (pairsMap.has(symbol)) return pairsMap.get(symbol);

  try {
    const [base, quote] = await Promise.all([
      seedCoin(coins, market.base),
      seedCoin(coins, market.quote),
    ]);

    Logger.log(`Symbol: ${symbol}, Name: ${name}, Alias: ${alias}`);
    // Logger.debug(market);
    const instance = pairs.create({ symbol, name, base, quote, exchange });
    const entity = await pairs.save(instance);

    Logger.log(`Created new pair in db: ${symbol}`);
    pairsMap.set(symbol, entity);

    return entity;
  } catch (e) {
    const entity = await pairs.findOne({ symbol });
    pairsMap.set(symbol, entity);

    return entity;
  }
}

export async function seedPairs(
  pairs: Repository<Pairs>,
  coins: Repository<Coins>,
  markets: ccxt.Market[],
  exchange: Exchanges,
) {
  for (const market of markets) {
    await seedPair(pairs, coins, market, exchange);
  }
}
