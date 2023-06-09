"use client";
import React, { useEffect } from "react";
import { Alert } from "@/ui/alert";
import { useAppDispatch, useAppSelector } from "@/store/store.hook";
import { setMessage } from "@/store/toastSlice";

export const Toast = () => {
  const message = useAppSelector((state) => state.toast.message);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (message) {
      setTimeout(() => dispatch(setMessage("")), 3000);
    }
  }, [message]);

  return <Alert message={message} />;
};
