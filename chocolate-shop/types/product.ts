export type ChocolateType = 'Dark' | 'Milk' | 'Vegan';

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
