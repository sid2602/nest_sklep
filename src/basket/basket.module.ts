import { ShopModule } from './../shop/shop.module';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { forwardRef, Module } from '@nestjs/common';

@Module({
  imports: [forwardRef(() => ShopModule)],
  providers: [BasketService],
  controllers: [BasketController],
  exports: [BasketService],
})
export class BasketModule {}
