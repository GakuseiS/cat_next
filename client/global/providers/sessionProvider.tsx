"use client";
import { SessionProvider as Provider } from "next-auth/react";

interface SessionProviderProps {
  children: React.ReactNode;
}

export const SessionProvider = ({ children }: SessionProviderProps) => {
  return <Provider>{children}</Provider>;
};
