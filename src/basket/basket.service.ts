import { Basket } from './basket.entity';
import { BasketItem } from './basketItem.entity';
import { BasketItemDTO, BasketInterface } from './basket.interface';
import { Inject, Injectable } from '@nestjs/common';
import { ShopService } from 'src/shop/shop.service';
import { MessageInterface } from 'src/message.interface';

@Injectable()
export class BasketService {
  constructor(@Inject(ShopService) private readonly shopService: ShopService) {}

  async createBasket(): Promise<BasketInterface> {
    const newBasket = new Basket();

    return await newBasket.save();
  }

  async addProductToBasket(
    basketId: string,
    basketItem: BasketItemDTO,
  ): Promise<BasketInterface | MessageInterface> {
    const basket = await Basket.findOne(basketId);

    if (!(await this.shopService.checkProductExist(basketItem.name))) {
      return {
        message: "We don't have product with this name in our shop",
        error: true,
      };
    }

    const newBasketItem = new BasketItem();
    newBasketItem.name = basketItem.name;
    newBasketItem.quantity = basketItem.quantity;
    await newBasketItem.save();

    basket.items = [...basket.items, newBasketItem];

    await basket.save();

    return basket;
  }

  async removeProductFromBasket(
    basketId: string,
    productId: string,
  ): Promise<MessageInterface> {
    const basket = await Basket.findOne(basketId);

    basket.items = basket.items.filter((item) => item.id !== productId);

    basket.save();

    return {
      message: 'Product deleted sucessfully',
      error: false,
    };
  }

  async removeAllProductFromBasket(
    basketId: string,
  ): Promise<MessageInterface> {
    const basket = await Basket.findOne(basketId);

    basket.items = [];

    basket.save();

    return {
      message: 'Succesfully removed all products from basket',
      error: false,
    };
  }

  async getAllBaskets(): Promise<BasketInterface[]> {
    return await Basket.find({});
  }

  async getBasket(id: string): Promise<BasketInterface> {
    return await Basket.findOne(id);
  }

  async getTotalBasketPrice(id: string): Promise<number> {
    const basket = await this.getBasket(id);

    const prices = await Promise.all(
      basket.items.map(
        async (item) =>
          (await this.shopService.getProductPrice(item.name)) * item.quantity,
      ),
    );

    const totalPrice =
      Math.round(prices.reduce((prev, curr) => (prev += curr), 0) * 100) / 100;

    return totalPrice;
  }
}
