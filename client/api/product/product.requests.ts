import { ProductData, ProductSupplements } from "./product.types";
import { baseApi } from "../baseApi";

export async function getCatalogMain() {
  const res = await baseApi({ url: "/api/cards" });
  return res.json() as Promise<ProductData>;
}

export async function getCatalogSupplements() {
  const res = await baseApi({ url: "/api/addons" });
  return res.json() as Promise<ProductSupplements>;
}
