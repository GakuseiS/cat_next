"use client";
import React, { FC, useRef } from "react";
import cn from "classnames";
import logoDesktop from "./assets/logo-desktop.png";
import logoTablet from "./assets/logo-tablet.png";
import Link from "next/link";
import Image from "next/image";
import { ROUTES } from "@/global/routes";
import { usePathname } from "next/navigation";
import { useDetectClick } from "@/global/hooks/useDetectClick";
import { AuthModal } from "../authModal";
import { signOut, useSession } from "next-auth/react";
import "./header.scss";

export const Header: FC = () => {
  const pathname = usePathname();
  const match = pathname === ROUTES.homePage;
  const modalRef = useRef<HTMLDivElement>(null);
  const { isActive, setActive } = useDetectClick({ ref: modalRef });
  const session = useSession();
  const withAuth = !!session.data;

  const linkStyles = (isActive?: boolean) => cn("header__link", !match && "alt", isActive && "active");

  const onClickLogin = () => {
    setActive(true);
  };

  const onClickLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <nav className="header">
      <Link href={ROUTES.homePage}>
        <picture>
          <source srcSet={logoTablet.src} media="(max-width: 768px)"></source>
          <Image src={logoDesktop} alt="logo" />
        </picture>
      </Link>
      <ul className="header__list">
        <li className="header__item">
          <Link className={linkStyles(pathname === ROUTES.homePage)} href={ROUTES.homePage}>
            Главная
          </Link>
        </li>
        <li className="header__item">
          <Link className={linkStyles(pathname === ROUTES.catalogPage)} href={ROUTES.catalogPage}>
            Каталог продукции
          </Link>
        </li>
        {!withAuth && (
          <li className="header__item">
            <Link className={linkStyles(pathname === ROUTES.formPage)} href={ROUTES.formPage}>
              Подбор программы
            </Link>
          </li>
        )}
        {withAuth && (
          <li className="header__item">
            <Link className={linkStyles(pathname === ROUTES.cartPage)} href={ROUTES.cartPage}>
              Корзина
            </Link>
          </li>
        )}
        {withAuth && (
          <li className="header__item">
            <Link className={linkStyles(pathname === ROUTES.ordersPage)} href={ROUTES.ordersPage}>
              Заказы
            </Link>
          </li>
        )}
        {!withAuth && (
          <li className="header__item">
            <button className={linkStyles()} onClick={onClickLogin}>
              Вход
            </button>
          </li>
        )}
        {withAuth && (
          <li className="header__item">
            <button className={linkStyles()} onClick={onClickLogout}>
              Выйти
            </button>
          </li>
        )}
      </ul>
      {isActive ? <AuthModal ref={modalRef} onClose={setActive} /> : null}
    </nav>
  );
};
