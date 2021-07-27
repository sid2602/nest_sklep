import { BasketService } from './basket.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { BasketDTO, BasketInterface, BasketItemDTO } from './basket.interface';
import { MessageInterface } from 'src/message.interface';

@Controller('basket')
export class BasketController {
  constructor(@Inject(BasketService) private basketService: BasketService) {}

  @Post('/create-basket')
  async CreateBasket(): Promise<BasketDTO> {
    return await this.basketService.createBasket();
  }

  @Post('/add-product/:basketId')
  async AddProduct(
    @Param('basketId') basketId: string,
    @Body() basketItem: BasketItemDTO,
  ): Promise<BasketInterface | MessageInterface> {
    console.log(basketId);
    return await this.basketService.addProductToBasket(basketId, basketItem);
  }

  @Get('/basket-price/:basketId')
  async GetTotalBasketPrice(
    @Param('basketId') basketId: string,
  ): Promise<number> {
    return this.basketService.getTotalBasketPrice(basketId);
  }

  @Get('/get-all-baskets')
  async GetAllBaskets(): Promise<BasketInterface[]> {
    return this.basketService.getAllBaskets();
  }

  @Get('/:basketId')
  async getBasket(@Param('basketId') basketId: string) {
    return this.basketService.getBasket(basketId);
  }

  @Delete('/delete-all-products/:basketId')
  async DeleteAllProductsFromBasket(@Param('basketId') basketId: string) {
    return this.basketService.removeAllProductFromBasket(basketId);
  }

  @Delete('/:basketId/:productId')
  async DeleteProductFromBasket(
    @Param('basketId') basketId: string,
    @Param('productId') productId: string,
  ) {
    return this.basketService.removeProductFromBasket(basketId, productId);
  }
}
