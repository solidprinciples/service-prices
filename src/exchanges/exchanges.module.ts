import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PricesModule } from 'src/prices/prices.module';
import { ByBitWebSocket } from './bybit.adapter';
import { Exchanges } from './exchanges.entity';

const exchangeOrmModule = TypeOrmModule.forFeature([Exchanges]);

@Module({
  imports: [exchangeOrmModule, PricesModule],
  providers: [ByBitWebSocket],
  exports: [exchangeOrmModule],
})
export class ExchangesModule {}
