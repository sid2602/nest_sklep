import { Injectable } from '@nestjs/common';
import { ShopItem } from './shop-item.entity';
import {
  ShopItemDTO,
  ShopItemInterface,
  ShopItemsGetResponse,
} from './shop.interface';

@Injectable()
export class ShopService {
  async addProduct(product: ShopItemDTO): Promise<ShopItemInterface> {
    const { name, description, price } = product;

    const newProduct = new ShopItem();

    newProduct.name = name;
    newProduct.description = description;
    newProduct.price = price;

    await newProduct.save();

    return newProduct;
  }

  async getProducts(page = 1): Promise<ShopItemsGetResponse> {
    const actualPage = page;
    const recordByPage = 2;

    const [items, count] = await ShopItem.findAndCount({
      skip: recordByPage * (actualPage - 1),
      take: recordByPage,
    });

    const countOfPages = Math.ceil(count / recordByPage);

    return {
      items,
      recordByPage,
      actualPage,
      countOfPages,
    };
  }

  async findProductByName(name: string): Promise<ShopItemInterface> {
    return await ShopItem.findOne({
      where: {
        name: name,
      },
    });
  }

  async checkProductExist(name: string): Promise<boolean> {
    const shopItems = await ShopItem.find({});

    return shopItems.some((item) => item.name === name);
  }

  async getAllProducts(): Promise<ShopItemInterface[]> {
    return await ShopItem.find({});
  }

  async getProductPrice(name: string): Promise<number> {
    if (!(await this.checkProductExist(name))) {
      return 0;
    }

    const price = (await this.findProductByName(name)).price;

    return price * 1.22;
  }
}
