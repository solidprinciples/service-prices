import { Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Coins } from './coins.entity';

import * as ccxt from 'ccxt';

const coinsMap = new Map<string, Coins>();

export async function seedCoin(coins: Repository<Coins>, symbol: string) {
  if (coinsMap.has(symbol)) return coinsMap.get(symbol);

  try {
    const instance = coins.create({ symbol });
    const entity = await coins.save(instance);

    Logger.log(`Created new coin in db: ${symbol} ${entity.id}`);
    coinsMap.set(symbol, entity);

    return entity;
  } catch (e) {
    const entity = await coins.findOne({ symbol });
    coinsMap.set(symbol, entity);

    return entity;
  }
}

export async function seedCoins(
  coins: Repository<Coins>,
  markets: ccxt.Market[],
) {
  const symbols: Set<string> = new Set();

  markets.forEach((market) => {
    symbols.add(market.base);
    symbols.add(market.quote);
  });

  for (const symbol of Array.from(symbols)) {
    await seedCoin(coins, symbol);
  }

  Logger.log(`Saved ${symbols.size} coins.`);
}
