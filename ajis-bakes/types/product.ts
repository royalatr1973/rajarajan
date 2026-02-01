export type ProductVertical = 'Cakes' | 'Biscuits' | 'Chocolates' | 'Brownies';

export type ProductCategory = string;

// Keep ChocolateType for backward compatibility
export type ChocolateType = string;

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  vertical: ProductVertical;
  type: ProductCategory;
  image: string;
  isBestSeller?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

// Categories per vertical
export const verticalCategories: Record<ProductVertical, string[]> = {
  Cakes: ['Chocolate', 'Classic', 'Theme', 'Fruit'],
  Biscuits: ['Butter', 'Cookies', 'Traditional', 'Savory'],
  Chocolates: ['Dark', 'Milk', 'White', 'Truffle'],
  Brownies: ['Classic', 'Fudge', 'Nutty', 'Blondie'],
};

export const allVerticals: ProductVertical[] = ['Cakes', 'Biscuits', 'Chocolates', 'Brownies'];
