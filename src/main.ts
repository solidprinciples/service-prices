/* eslint-disable prettier/prettier */
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { ByBitWebSocket } from './exchanges/bybit.adapter';

import { SeedersService } from './seeders/seeders.service';

const logger = new Logger('service-prices');

async function start() {
  const app = await NestFactory.createMicroservice(AppModule, {
    options: {
      port: 3003,
      host: 'localhost',
    },
    transport: Transport.TCP
  });
  
  await app.get(SeedersService).seed();  
  app.get(ByBitWebSocket).watch();

  app.listen(() => logger.log(`Service has been start on port ${3003}`));
}

start();
