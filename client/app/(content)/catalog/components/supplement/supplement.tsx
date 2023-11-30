'use client';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import styles from './supplement.module.scss';
import { usePostProductMutation } from '@/api/product/product.queries';
import { ProductSupplements } from '@/api/product/product.types';
import { setMessage } from '@/store/toastSlice';
import { Button } from '@/ui';

interface SupplementsProps {
  supplements: ProductSupplements;
}

export const Supplement: FC<SupplementsProps> = ({ supplements }) => {
  const dispatch = useDispatch();
  const [postProduct] = usePostProductMutation();

  const orderSupplement = async (id: string) => {
    try {
      const data = await postProduct({ id }).unwrap();
      dispatch(setMessage(data.message));
    } catch (err: any) {
      dispatch(setMessage(err.data?.message));
      console.error('Ошибка заказа');
    }
  };

  return (
    <div className={styles.sup}>
      <h2 className={styles.title}>Дополнительные товары</h2>
      <div className={styles.content}>
        <ul className={styles.list}>
          {supplements?.map((supply) => {
            return (
              <li key={supply.id} className={styles.listItem}>
                <span className={styles.itemTitle}>{supply.title}</span>{' '}
                <span className={styles.size}>{supply.size}</span>{' '}
                <span className={styles.price}>{supply.price} ₽</span>
                <div className={styles.form}>
                  <Button page='catalog' onClick={() => orderSupplement(supply.id)}>
                    Заказать
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
        <div className={styles.all}>
          <p className={styles.text}>
            Закажите все
            <br /> и получите чехол для кота в подарок!
          </p>
        </div>
      </div>
    </div>
  );
};
