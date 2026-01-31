import { getProducts } from '@/lib/sanity';
import ProductsList from '@/components/products/ProductsList';

export default async function ProductsPage() {
  const products = await getProducts();

  return <ProductsList products={products} />;
}
