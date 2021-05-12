import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pairs } from './pairs.entity';

const typeOrmModule = TypeOrmModule.forFeature([Pairs]);

@Module({
  imports: [typeOrmModule],
  exports: [typeOrmModule],
})
export class PairsModule {}
