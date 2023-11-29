import { yupResolver } from '@hookform/resolvers/yup';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { FieldsValues, RegisterValues } from './modal.types';
import { usePostRegisterMutation } from '@/api/login/login.queries';
import { useAppDispatch } from '@/store/store.hook';
import { setMessage } from '@/store/toastSlice';

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
  } = useForm<FieldsValues>({ mode: 'onBlur', resolver: yupResolver(schema) });

  const registerHandler = handleSubmit(async (data) => {
    try {
      const res = await postRegister(data as RegisterValues).unwrap();
      dispatch(setMessage(res.message));
      setSwitcher(true);
      reset();
    } catch (err: any) {
      dispatch(setMessage(err.data?.message));
      console.error('Ошибка регистрации');
    }
  });

  const loginHandler = handleSubmit(async (data) => {
    const result = await signIn('credentials', { ...data, redirect: false });
    if (result?.error) {
      const error = JSON.parse(result.error);
      if (error) dispatch(setMessage(error.message));
    } else {
      onClose(false);
    }
  });

  const switchContent = (type: 'login' | 'register') => {
    setSwitcher(type === 'login');
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
