import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PricesController } from './prices.controller';
import { Prices } from './prices.entity';
import { PricesService } from './prices.service';

const typeOrmModule = TypeOrmModule.forFeature([Prices]);

@Module({
  imports: [typeOrmModule],
  controllers: [PricesController],
  providers: [PricesService],
  exports: [typeOrmModule, PricesService],
})
export class PricesModule {}
