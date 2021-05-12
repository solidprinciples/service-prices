import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coins } from './coins.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coins])],
  exports: [TypeOrmModule],
})
export class CoinsModule {}
