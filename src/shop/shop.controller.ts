import { ShopService } from './shop.service';
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  ShopItemDTO,
  ShopItemInterface,
  ShopItemsGetResponse,
} from './shop.interface';

@Controller('shop')
export class ShopController {
  constructor(@Inject(ShopService) private shopService: ShopService) {}

  @Post('/')
  async addProduct(@Body() product: ShopItemDTO): Promise<ShopItemInterface> {
    return await this.shopService.addProduct(product);
  }

  @Get('/:name')
  async getProductByName(
    @Param('name') name: string,
  ): Promise<ShopItemInterface> {
    return await this.shopService.findProductByName(name);
  }

  @Get('/')
  async getProducts(
    @Query('page') page: string,
  ): Promise<ShopItemsGetResponse> {
    return this.shopService.getProducts(Number(page));
  }

  @Get('/get-all-products')
  async getAllProducts(): Promise<ShopItemInterface[]> {
    return this.shopService.getAllProducts();
  }

  @Get('/get-product-price/:productName')
  async getProductPrice(
    @Param('productName') productName: string,
  ): Promise<number> {
    return this.shopService.getProductPrice(productName);
  }
}
