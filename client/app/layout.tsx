import { Oswald } from "next/font/google";
import { Footer } from "../modules/footer";
import { Header } from "../modules/header";
import { Metadata } from "next";
import { StoreProvider } from "@/global/providers/storeProvider";
import { Toast } from "@/components/toast";
import styles from "./layout.module.scss";
import "./globals.css";

const oswald = Oswald({ subsets: ["cyrillic", "latin"] });

export const metadata: Metadata = {
  title: "Cat Energy",
  description: "Функциональное питание для котов",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={oswald.className}>
        <div className={styles.container}>
          <StoreProvider>
            <Toast />
            <Header />
            {children}
          </StoreProvider>
          <Footer />
        </div>
      </body>
    </html>
  );
}
