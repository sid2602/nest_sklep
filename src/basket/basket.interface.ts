export class BasketItemDTO {
  name: string;
  quantity: number;
}

export interface BasketItemInterface extends BasketItemDTO {
  id: string;
}

export class BasketDTO {
  items: BasketItemDTO[];
}

export interface BasketInterface extends BasketDTO {
  id: string;
}
