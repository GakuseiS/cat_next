'use client';
import React from 'react';
import styles from './page.module.scss';
import { useCart } from './useCart';
import { Button, Loader } from '@/ui';

export default function CartPage() {
  const { isLoading, cartList, deleteItemHandler, postOrderHandler, clearCardHandler } = useCart();

  if (isLoading) {
    return (
      <div className={styles.cartPage}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <h1 className={styles.title}>Корзина</h1>
      {cartList?.allPrice ? (
        <div>
          <ol className={styles.list}>
            {cartList.items?.map((product) => (
              <li key={product.id} className={styles.item}>
                {product.title} {product.size} {product.taste} - {product.price} руб. - {product.count} шт.
                <button
                  title='Удалить из корзины'
                  onClick={() => deleteItemHandler(product.id)}
                  className={styles.delete}
                >
                  ✕
                </button>
              </li>
            ))}
          </ol>
          <p className={styles.price}>Общая стоимость: {cartList?.allPrice} руб.</p>
          <Button onClick={() => postOrderHandler(cartList.id)}>Сделать заказ</Button>
          <Button className={styles.clear} onClick={clearCardHandler}>
            Очистить корзину
          </Button>
        </div>
      ) : null}
      {cartList?.allPrice === 0 ? <p>Ваша корзина пуста</p> : null}
    </div>
  );
}
