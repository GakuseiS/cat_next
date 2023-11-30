'use client';
import React, { FC } from 'react';
import styles from './catalog.module.scss';
import { CatalogItem } from '../catalogItem';
import { ProductData } from '@/api/product/product.types';
import { Button } from '@/ui';

interface CatalogProps {
  cards: ProductData;
}

export const Catalog: FC<CatalogProps> = ({ cards }) => {
  return (
    <div className={styles.catalog}>
      {cards?.map((card) => <CatalogItem key={card.id} {...card} />)}
      <div className={styles.more}>
        <h3 className={styles.title}>
          Показать еще
          <br /> 100500 товаров
        </h3>
        <p className={styles.text}>На самом деле вкусов гораздо больше!</p>
        <Button size='small' color='gray'>
          Показать всё
        </Button>
      </div>
    </div>
  );
};
