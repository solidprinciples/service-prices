/* eslint-disable prettier/prettier */
import { SERVICE_PRICES_CONFIG, SERVICE_PRICES_PORT } from '@blocksuite/common';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ByBitWebSocket } from './exchanges/bybit.adapter';

import { SeedersService } from './seeders/seeders.service';

const logger = new Logger('service-prices');

async function start() {
  const app = await NestFactory.createMicroservice(AppModule, SERVICE_PRICES_CONFIG);  
  
  await app.get(SeedersService).seed();  
  app.get(ByBitWebSocket).watch();

  app.listen(() => logger.log(`Service has been start on port ${SERVICE_PRICES_PORT}`));
}

start();
