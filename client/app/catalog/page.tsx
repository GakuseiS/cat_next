import React from "react";
import { Catalog, Supplement } from "./components";
import styles from "./page.module.scss";
import { getCatalogSupplements, getCatalogMain } from "@/api/product/product.requests";

export const revalidate = 86_400;

export default async function CatalogPage() {
  const cards = await getCatalogMain();
  const supplements = await getCatalogSupplements();
  return (
    <main className={styles.catalogPage}>
      <h1 className={styles.title}>Каталог продукции</h1>
      <Catalog cards={cards} />
      <Supplement supplements={supplements} />
    </main>
  );
}
