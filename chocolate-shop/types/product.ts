export type ChocolateType = 'Chocolate' | 'Classic' | 'Theme' | 'Fruit';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  type: ChocolateType;
  image: string;
  isBestSeller?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}
