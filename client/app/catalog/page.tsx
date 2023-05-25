import React from "react";
import { Catalog, Supplement } from "./components";
import styles from "./page.module.scss";

export default function CatalogPage() {
  return (
    <main className={styles.catalogPage}>
      <h1 className={styles.title}>Каталог продукции</h1>
      <Catalog />
      <Supplement />
    </main>
  );
}
