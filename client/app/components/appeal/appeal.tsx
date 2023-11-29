"use client";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { FC } from "react";
import can from "./assets/index-can.png";
import { ROUTES } from "@/global/routes";
import { Button } from "@/ui";
import "./appeal.scss";

export const Appeal: FC = () => {
  const session = useSession();
  const withAuth = !!session.data;
  return (
    <div className="appeal">
      <div className="appeal__left">
        <h1 className="appeal__header">Функциональное питание для котов</h1>
        <p className="appeal__text">Занялся собой? Займись котом!</p>
        {!withAuth ? (
          <Link href={ROUTES.formPage}>
            <Button>Подобрать программу</Button>
          </Link>
        ) : null}
      </div>
      <Image className="appeal__img" src={can} alt="can" />
    </div>
  );
};
