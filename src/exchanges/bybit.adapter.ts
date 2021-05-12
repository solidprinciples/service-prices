import { Inject, Injectable, Logger } from '@nestjs/common';
import * as ccxt from 'ccxt';

import { WebsocketClient } from 'bybit-api';
import { PricesService } from 'src/prices/prices.service';

@Injectable()
export class ByBitWebSocket {
  private logger: Logger = new Logger('ws');

  constructor(private readonly prices: PricesService) {
    this.exchange = new ccxt.bybit();
  }

  private exchange: ccxt.bybit;

  async handleUpdate(data: any) {
    const symbol = data.topic.split('.').pop();
    const close = data.data[0];

    this.logger.log(`update: ${symbol} - ${close}`);
  }

  async watch() {
    this.logger.log(`Starting to watch for changes on Binances`);
    const ws = new WebsocketClient({});

    ws.subscribe('trade.*');

    // Listen to events coming from websockets. This is the primary data source
    ws.on('update', (data) => this.handleUpdate(data));
    ws.on('response', (response) => this.logger.log(response));
    ws.on('close', () => this.logger.log('connection closed'));
    ws.on('error', (err) => this.logger.error(err));
  }
}
