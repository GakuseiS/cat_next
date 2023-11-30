'use client';
import cn from 'classnames';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import fLogo from './assets/footer-logo.png';
import styles from './footer.module.scss';
import { ROUTES } from '@/global/routes';

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.top}>
        <div className={cn(styles.modal)}>
          <h2 className={styles.title}>
            Приглашаем <br /> к сотрудничеству дилеров!
          </h2>
          <p className={styles.address}>
            ул. Большая
            <br /> Конюшенная, д. 19/8
            <span className={styles.city}>Санкт-Петербург</span>
          </p>
        </div>
        <iframe
          className={styles.map}
          title='map'
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1998.5999067139514!2d30.32100801621116!3d59.93878086904905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4696310fca640933%3A0x8403eb878242dbd5!2z0JTQvtGF0L7QtNC90YvQuSDQtNC-0Lwg0J0uINCQLiDQnNC10LvRjNGG0LXRgNCw!5e0!3m2!1sru!2sru!4v1617520436699!5m2!1sru!2sru'
          allowFullScreen={true}
          loading='lazy'
        ></iframe>
      </div>
      <div className={styles.bottom}>
        <Link href={ROUTES.homePage}>
          <Image width='130' height='25' src={fLogo} alt='logo' />
        </Link>
        <ul className={styles.social}>
          <li>
            <a className={classNames(styles.item, styles.vk)} href='https://vk.com'>
              vk
            </a>
          </li>
          <li>
            <a className={classNames(styles.item, styles.instagram)} href='https://www.instagram.com'>
              inst
            </a>
          </li>
          <li>
            <a className={classNames(styles.item, styles.fb)} href='https://ru-ru.facebook.com/'>
              fb
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
