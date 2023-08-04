import { SessionProvider } from "./sessionProvider";
import { StoreProvider } from "./storeProvider";

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <SessionProvider>
      <StoreProvider>{children}</StoreProvider>
    </SessionProvider>
  );
};
