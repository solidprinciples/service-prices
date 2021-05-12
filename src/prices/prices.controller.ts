import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller('prices')
export class PricesController {
  @MessagePattern('health')
  healthCheck(): string {
    return 'OK';
  }
}
