import { ProductData, ProductSupplements } from './product.types';
import { serverApi } from '../serverApi';

export async function getCatalogMain() {
  const cards = await serverApi<ProductData>({ url: 'cards' });
  return cards;
}

export async function getCatalogSupplements() {
  const addons = await serverApi<ProductSupplements>({ url: 'addons' });
  return addons;
}
