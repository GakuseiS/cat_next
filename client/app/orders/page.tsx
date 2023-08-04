"use client";
import React from "react";
import { useGetOrdersQuery } from "@/api/order/order.queries";
import { Loader } from "@/ui/loader";
import "./page.scss";

const getFormattedDate = (date: string) =>
  new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));

export default function OrdersPage() {
  const { data: orders, isLoading } = useGetOrdersQuery();

  if (isLoading) {
    return (
      <div className="ordersPage">
        <Loader />
      </div>
    );
  }

  return (
    <div className="ordersPage">
      <h1 className="ordersPage__title">Заказы</h1>
      {orders?.map((order) => (
        <div key={order.id}>
          <p>Время заказа {getFormattedDate(order.createdAt)}</p>
          <ol>
            {order.items.map((product) => (
              <li key={product.id}>
                {product.title} {product.size} {product.taste} {product.price} руб. - {product.count} шт.
              </li>
            ))}
          </ol>
          <p>Общая цена: {order.allPrice} руб.</p>
        </div>
      ))}
      {!orders?.length ? <p>У вас нет заказов</p> : null}
    </div>
  );
}
