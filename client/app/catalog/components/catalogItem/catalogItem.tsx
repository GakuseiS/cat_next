'use client';
import React from 'react';
import { usePostProductMutation } from '@/api/product/product.queries';
import { useAppDispatch } from '@/store/store.hook';
import { setMessage } from '@/store/toastSlice';
import { Button } from '@/ui';
import './catalogItem.scss';

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
    <div className='catalogItem'>
      <div className='catalogItem__wrapper'>
        <img className='catalogItem__img' src={img} alt='pack' />
      </div>

      <h3 className='catalogItem__title'>
        {title}
        <br />
        {size} Г
      </h3>
      <ul className='catalogItem__list'>
        <li className='catalogItem__list-item'>
          Объем <span>{size} г</span>
        </li>
        <li className='catalogItem__list-item'>
          Вкус <span>{taste}</span>
        </li>
        <li className='catalogItem__list-item'>
          Цена <span>{price} ₽</span>
        </li>
      </ul>
      <Button size='small' page='catalog' onClick={submitHandler}>
        Заказать
      </Button>
    </div>
  );
};
