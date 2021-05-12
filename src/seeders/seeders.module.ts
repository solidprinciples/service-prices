import { Module } from '@nestjs/common';
import { ExchangesModule } from 'src/exchanges/exchanges.module';
import { SeedersService } from './seeders.service';

@Module({
  imports: [ExchangesModule],
  providers: [SeedersService],
})
export class SeedersModule {}
