export interface ShopItemInterface {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface ShopItemsGetResponse {
  items: ShopItemInterface[];
  recordByPage: number;
  actualPage: number;
  countOfPages: number;
}

export class ShopItemDTO {
  name: string;
  description: string;
  price: number;
}
