"use client";
import React, { MouseEventHandler, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/global/routes/routes.type";
import { setMessage } from "@/store/toastSlice";
import { useDeleteBasketItemMutation, useDeleteBasketMutation, useGetBasketQuery } from "@/api/card/card.queries";
import { usePostOrderMutation } from "@/api/order/order.queries";
import { useAppDispatch, useAppSelector } from "@/store/store.hook";
import { Loader } from "@/ui/loader";
import { Button } from "@/ui";
import "./page.scss";

export default function CartPage() {
  const router = useRouter();
  const { token } = useAppSelector((state) => state.login);
  const { data: cartList, isLoading } = useGetBasketQuery();
  const [clearCard] = useDeleteBasketMutation();
  const [deleteItem] = useDeleteBasketItemMutation();
  const [postOrder] = usePostOrderMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    !token && router.push(ROUTES.homePage);
  }, [token]);

  const clearCardHandler = async () => {
    try {
      const data = await clearCard().unwrap();
      dispatch(setMessage(data.message));
    } catch (err: any) {
      dispatch(setMessage(err.data?.message));
      console.error("Ошибка очищения корзины");
    }
  };

  const deleteItemHandler: MouseEventHandler<HTMLButtonElement> = async (evt) => {
    const id = (evt.target as HTMLButtonElement).dataset.id;
    if (id) {
      try {
        const data = await deleteItem({ id }).unwrap();
        dispatch(setMessage(data.message));
      } catch (err: any) {
        dispatch(setMessage(err.data?.message));
        console.error("Ошибка удаления из корзины");
      }
    }
  };

  const postOrderHandler = async () => {
    if (cartList?.id) {
      try {
        await postOrder({ id: cartList.id });
        router.push(ROUTES.ordersPage);
      } catch (err: any) {
        dispatch(setMessage(err.data?.message));
        console.error("Ошибка отправки заказа");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="cartPage">
        <Loader />
      </div>
    );
  }

  return (
    <div className="cartPage">
      <h1 className="cartPage__title">Корзина</h1>
      {cartList?.allPrice ? (
        <div>
          <ol className="cartPage__list">
            {cartList.items?.map((pruduct) => (
              <li key={pruduct.id} className="cartPage__item">
                {pruduct.title} {pruduct.size} {pruduct.taste} - {pruduct.price} руб. - {pruduct.count} шт.
                <button
                  title="Удалить из корзины"
                  data-id={pruduct.id}
                  onClick={deleteItemHandler}
                  className="cartPage__delete"
                >
                  ✕
                </button>
              </li>
            ))}
          </ol>
          {<p className="cartPage__price">Общая стоимость: {cartList?.allPrice} руб.</p>}
          <Button onClick={postOrderHandler}>Сделать заказ</Button>
          <Button className="cartPage__clear" onClick={clearCardHandler}>
            Очистить корзину
          </Button>
        </div>
      ) : null}
      {cartList?.allPrice === 0 ? <p>Ваша корзина пуста</p> : null}
    </div>
  );
}
