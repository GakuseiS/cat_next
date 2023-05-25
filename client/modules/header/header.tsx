"use client";
import React, { useRef } from "react";
import cn from "classnames";
import logoDesktop from "./assets/logo-desktop.png";
import logoTablet from "./assets/logo-tablet.png";
import Link from "next/link";
import Image from "next/image";
import { ROUTES } from "@/global/routes/routes.type";
import { useAppSelector, useAppDispatch } from "@/store/store.hook";
import { usePathname } from "next/navigation";
import { useDetectClick } from "@/global/hooks/useDetectClick";
import { useRouter } from "next/navigation";
import { logout } from "@/store/loginSlice";
import { AuthModal } from "../authModal";
import "./header.scss";

export const Header = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.login);
  const match = pathname === ROUTES.homePage;
  const modalRef = useRef<HTMLDivElement>(null);
  const { isActive, setActive } = useDetectClick({ ref: modalRef });
  const router = useRouter();

  const linkStyles = (isActive?: boolean) => cn("header__link", !match && "alt", isActive && "active");

  const onClickLogin = () => {
    setActive(true);
  };

  const onClickLogout = () => {
    dispatch(logout());
    router.push(ROUTES.homePage);
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
        {!token && (
          <li className="header__item">
            <Link className={linkStyles(pathname === ROUTES.formPage)} href={ROUTES.formPage}>
              Подбор программы
            </Link>
          </li>
        )}
        {token && (
          <li className="header__item">
            <Link className={linkStyles(pathname === ROUTES.cartPage)} href={ROUTES.cartPage}>
              Корзина
            </Link>
          </li>
        )}
        {token && (
          <li className="header__item">
            <Link className={linkStyles(pathname === ROUTES.ordersPage)} href={ROUTES.ordersPage}>
              Заказы
            </Link>
          </li>
        )}
        {!token && (
          <li className="header__item">
            <button className={linkStyles()} onClick={onClickLogin}>
              Вход
            </button>
          </li>
        )}
        {token && (
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
