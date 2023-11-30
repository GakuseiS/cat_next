'use client';
import React from 'react';
import styles from './catalogItem.module.scss';
import { usePostProductMutation } from '@/api/product/product.queries';
import { useAppDispatch } from '@/store/store.hook';
import { setMessage } from '@/store/toastSlice';
import { Button } from '@/ui';

interface CatalogItemProps {
  id: string;
  title: string;
  img: string;
  size: string;
  taste: string;
  price: number;
}

export const CatalogItem = ({ id, title, img, size, taste, price }: CatalogItemProps) => {
  const dispatch = useAppDispatch();
  const [postProduct] = usePostProductMutation();

  const submitHandler = async () => {
    try {
      const data = await postProduct({ id }).unwrap();
      dispatch(setMessage(data.message));
    } catch (err: any) {
      dispatch(setMessage(err.data?.message));
      console.error('Ошибка заказа');
    }
  };

  return (
    <div className={styles.catalogItem}>
      <div className={styles.wrapper}>
        <img className={styles.img} src={img} alt='pack' />
      </div>

      <h3 className={styles.title}>
        {title}
        <br />
        {size} Г
      </h3>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          Объем <span>{size} г</span>
        </li>
        <li className={styles.listItem}>
          Вкус <span>{taste}</span>
        </li>
        <li className={styles.listItem}>
          Цена <span>{price} ₽</span>
        </li>
      </ul>
      <Button size='small' page='catalog' onClick={submitHandler}>
        Заказать
      </Button>
    </div>
  );
};
