"use client";
import { store } from "@/store";
import { initLogin } from "@/store/loginSlice";
import { Loader } from "@/ui/loader";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";

interface StoreProviderProps {
  children: React.ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    store.dispatch(initLogin());
    setLoading(false);
  }, []);
  if (loading) return <Loader />;
  return <Provider store={store}>{children}</Provider>;
};
