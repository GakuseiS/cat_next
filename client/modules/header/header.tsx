'use client';
import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import React, { FC, useRef } from 'react';
import logoDesktop from './assets/logo-desktop.png';
import logoTablet from './assets/logo-tablet.png';
import styles from './header.module.scss';
import { AuthModal } from '../authModal';
import { useDetectClick } from '@/global/hooks/useDetectClick';
import { ROUTES } from '@/global/routes';

export const Header: FC = () => {
  const pathname = usePathname();
  const match = pathname === ROUTES.homePage;
  const modalRef = useRef<HTMLDivElement>(null);
  const { isActive, setActive } = useDetectClick({ ref: modalRef });
  const session = useSession();
  const withAuth = !!session.data;

  const linkStyles = (isActive?: boolean) => cn(styles.link, !match && styles.alt, isActive && styles.active);

  const onClickLogin = () => {
    setActive(true);
  };

  const onClickLogout = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <nav className={styles.header}>
      <Link href={ROUTES.homePage}>
        <picture>
          <source srcSet={logoTablet.src} media='(max-width: 768px)'></source>
          <Image src={logoDesktop} alt='logo' />
        </picture>
      </Link>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link className={linkStyles(pathname === ROUTES.homePage)} href={ROUTES.homePage}>
            Главная
          </Link>
        </li>
        <li className={styles.item}>
          <Link className={linkStyles(pathname === ROUTES.catalogPage)} href={ROUTES.catalogPage}>
            Каталог продукции
          </Link>
        </li>
        {!withAuth && (
          <li className={styles.item}>
            <Link className={linkStyles(pathname === ROUTES.formPage)} href={ROUTES.formPage}>
              Подбор программы
            </Link>
          </li>
        )}
        {withAuth && (
          <li className={styles.item}>
            <Link className={linkStyles(pathname === ROUTES.cartPage)} href={ROUTES.cartPage}>
              Корзина
            </Link>
          </li>
        )}
        {withAuth && (
          <li className={styles.item}>
            <Link className={linkStyles(pathname === ROUTES.ordersPage)} href={ROUTES.ordersPage}>
              Заказы
            </Link>
          </li>
        )}
        {!withAuth && (
          <li className={styles.item}>
            <button className={linkStyles()} onClick={onClickLogin}>
              Вход
            </button>
          </li>
        )}
        {withAuth && (
          <li className={styles.item}>
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
