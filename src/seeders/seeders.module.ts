import { Module } from '@nestjs/common';
import { ExchangesModule } from 'src/exchanges/exchanges.module';
import { CoinsModule } from '../coins/coins.module';
import { PairsModule } from '../pairs/pairs.module';
import { SeedersService } from './seeders.service';

@Module({
  imports: [ExchangesModule, CoinsModule, PairsModule],
  providers: [SeedersService],
})
export class SeedersModule {}
