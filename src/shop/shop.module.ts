import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [ShopController],
  providers: [ShopService],
  exports: [ShopService],
})
export class ShopModule {}
