"use client";
import React from "react";
import { Loader } from "@/ui/loader";
import { Button } from "@/ui";
import { CatalogItem } from "../catalogItem";
import { useGetMainProductsQuery } from "@/api/product/product.queries";
import "./catalog.scss";

export const Catalog = () => {
  const { data: cards, isLoading } = useGetMainProductsQuery();

  if (isLoading) {
    return (
      <div className="catalog">
        <Loader />
      </div>
    );
  }

  return (
    <div className="catalog">
      {cards?.map((card) => (
        <CatalogItem key={card.id} {...card} />
      ))}
      <div className="catalog__more">
        <h3 className="catalog__more-title">
          Показать еще
          <br /> 100500 товаров
        </h3>
        <p className="catalog__more-text">На самом деле вкусов гораздо больше!</p>
        <Button size="small" color="gray">
          Показать всё
        </Button>
      </div>
    </div>
  );
};
