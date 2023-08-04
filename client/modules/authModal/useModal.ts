import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { FieldsValues, RegisterValues } from "./modal.types";
import { useAppDispatch } from "@/store/store.hook";
import { setMessage } from "@/store/toastSlice";
import { usePostRegisterMutation } from "@/api/login/login.queries";
import { signIn } from "next-auth/react";

const schema: yup.ObjectSchema<FieldsValues> = yup
  .object({
    name: yup.string().min(3).optional(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  })
  .required();

export const useModal = ({ onClose }: { onClose: Function }) => {
  const [switcher, setSwitcher] = useState(true);
  const dispatch = useAppDispatch();
  const [postRegister] = usePostRegisterMutation();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldsValues>({ mode: "onBlur", resolver: yupResolver(schema) });
  const registerHandler = handleSubmit(async (data) => {
    try {
      const res = await postRegister(data as RegisterValues).unwrap();
      dispatch(setMessage(res.message));
      setSwitcher(true);
      reset();
    } catch (err: any) {
      dispatch(setMessage(err.data?.message));
      console.error("Ошибка регистрации");
    }
  });

  const loginHandler = handleSubmit(async (data) => {
    try {
      await signIn("credentials", { ...data, callbackUrl: "/" });
      onClose(false);
    } catch (err: any) {
      dispatch(setMessage(err.data?.message));
      console.error("Ошибка авторизации");
    }
  });

  const switchContent = (type: "login" | "register") => {
    setSwitcher(type === "login");
  };
  return {
    loginHandler,
    registerHandler,
    switcher,
    register,
    errors,
    switchContent,
  };
};
