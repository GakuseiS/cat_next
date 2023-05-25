"use client";
import can from "./assets/index-can.png";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/ui";
import { useAppSelector } from "@/store/store.hook";
import { ROUTES } from "@/global/routes/routes.type";
import "./appeal.scss";

export const Appeal = () => {
  const { token } = useAppSelector((state) => state.login);
  return (
    <div className="appeal">
      <div className="appeal__left">
        <h1 className="appeal__header">Функциональное питание для котов</h1>
        <p className="appeal__text">Занялся собой? Займись котом!</p>
        {!token ? (
          <Link href={ROUTES.formPage}>
            <Button>Подобрать программу</Button>
          </Link>
        ) : null}
      </div>
      <Image className="appeal__img" src={can} alt="can" />
    </div>
  );
};
