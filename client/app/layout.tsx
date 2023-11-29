import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { ReactNode } from 'react';
import styles from './layout.module.scss';
import { Footer } from '../modules/footer';
import { Header } from '../modules/header';
import { Toast } from '@/components/toast';
import { authConfig } from '@/configs/auth';
import { Providers } from '@/global/providers';
import '@/global/styles/globals.css';

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Cat Energy',
  description: 'Функциональное питание для котов',
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getServerSession(authConfig);

  return (
    <html lang='ru'>
      <body>
        <div className={styles.container}>
          <Providers session={session}>
            <Toast />
            <Header />
            {children}
          </Providers>
          <Footer />
        </div>
      </body>
    </html>
  );
}
