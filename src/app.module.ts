import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Coins } from './coins/coins.entity';
import { CoinsModule } from './coins/coins.module';

import { ExchangesModule } from './exchanges/exchanges.module';
import { Exchanges } from './exchanges/exchanges.entity';

import { Pairs } from './pairs/pairs.entity';
import { PairsModule } from './pairs/pairs.module';

import { PricesModule } from './prices/prices.module';
import { SeedersModule } from './seeders/seeders.module';
import { Prices } from './prices/prices.entity';

const entities = [Coins, Pairs, Prices, Exchanges];
const dbConfig = {};

const factory = async () => ({ ...dbConfig, entities });
const typeOrmModule = TypeOrmModule.forRootAsync({ useFactory: factory });

@Module({
  imports: [
    typeOrmModule,
    PricesModule,
    ExchangesModule,
    CoinsModule,
    PairsModule,
    PricesModule,
    SeedersModule,
  ],
})
export class AppModule {}
