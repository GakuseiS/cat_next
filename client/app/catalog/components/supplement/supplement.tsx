"use client";
import React, { FC, FormEventHandler } from "react";
import { useDispatch } from "react-redux";
import { usePostProductMutation } from "@/api/product/product.queries";
import { ProductSupplements } from "@/api/product/product.types";
import { setMessage } from "@/store/toastSlice";
import { Button } from "@/ui";
import "./supplement.scss";

interface SupplementsProps {
  supplements: ProductSupplements;
}

export const Supplement: FC<SupplementsProps> = ({ supplements }) => {
  const dispatch = useDispatch();
  const [postProduct] = usePostProductMutation();

  const submitHandler: FormEventHandler<HTMLFormElement> = async (evt) => {
    evt.preventDefault();
    const id = evt.currentTarget.dataset.id;
    if (id) {
      try {
        const data = await postProduct({ id }).unwrap();
        dispatch(setMessage(data.message));
      } catch (err: any) {
        dispatch(setMessage(err.data?.message));
        console.error("Ошибка заказа");
      }
    }
  };

  return (
    <div className="sup">
      <h2 className="sup__title">Дополнительные товары</h2>
      <div className="sup__content">
        <ul className="sup__list">
          {supplements?.map((supply) => {
            return (
              <li key={supply.id} className="sup__list-item">
                <span className="sup__item-title">{supply.title}</span> <span className="sup__size">{supply.size}</span>{" "}
                <span className="sup__price">{supply.price} ₽</span>
                <form className="sup__form" method="POST" onSubmit={submitHandler} data-id={supply.id}>
                  <Button page="catalog">Заказать</Button>
                </form>
              </li>
            );
          })}
        </ul>
        <div className="sup__all">
          <p className="sup__all-text">
            Закажите все
            <br /> и получите чехол для кота в подарок!
          </p>
        </div>
      </div>
    </div>
  );
};
