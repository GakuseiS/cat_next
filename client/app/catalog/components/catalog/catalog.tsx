"use client";
import React, { FC } from "react";
import { Button } from "@/ui";
import { CatalogItem } from "../catalogItem";
import "./catalog.scss";
import { ProductData } from "@/api/product/product.types";

interface CatalogProps {
  cards: ProductData;
}

export const Catalog: FC<CatalogProps> = ({ cards }) => {
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
