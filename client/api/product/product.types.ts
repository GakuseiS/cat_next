export type ProductData = {
  id: string;
  type: string;
  title: string;
  img: string;
  size: string;
  taste: string;
  price: number;
}[];

export type ProductSupplements = Omit<ProductData, 'img' | 'taste'>;
