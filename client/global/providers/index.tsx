import { Session } from "next-auth";
import { ReactNode } from "react";
import { SessionProvider } from "./sessionProvider";
import { StoreProvider } from "./storeProvider";

interface ProvidersProps {
  children: ReactNode;
  session: Session | null;
}

export const Providers = ({ children, session }: ProvidersProps) => {
  return (
    <SessionProvider session={session}>
      <StoreProvider>{children}</StoreProvider>
    </SessionProvider>
  );
};
