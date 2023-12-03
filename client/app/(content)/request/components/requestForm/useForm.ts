import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { usePostProgramMutation } from '@/api/request/request.queries';
import { useAppDispatch } from '@/store/store.hook';
import { setMessage } from '@/store/toastSlice';

export type FormValues = {
  name: string;
  weight: number;
  age: number;
  email: string;
  tel: string;
  comment?: string;
  sugar?: boolean;
  water?: boolean;
  milk?: boolean;
  vitamin?: boolean;
  type?: string;
};

export const schema: yup.ObjectSchema<FormValues> = yup
  .object({
    name: yup.string().min(3).required(),
    weight: yup.number().min(0).required(),
    age: yup.number().min(0).required(),
    email: yup.string().email().required(),
    tel: yup
      .string()
      .matches(/\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}/g)
      .required(),
    comment: yup.string(),
    sugar: yup.boolean(),
    water: yup.boolean(),
    milk: yup.boolean(),
    vitamin: yup.boolean(),
    type: yup.string(),
  })
  .required();

export const useRequestForm = () => {
  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });
  const { handleSubmit, reset } = methods;
  const [postProgram] = usePostProgramMutation();
  const dispatch = useAppDispatch();

  const submitHandler = handleSubmit(async (data) => {
    try {
      const { age, weight, sugar, water, milk, vitamin, ...rest } = data;
      const res = await postProgram({
        ...rest,
        age: +age,
        weight: +weight,
        sugar: String(sugar),
        water: String(water),
        milk: String(milk),
        vitamin: String(vitamin),
      }).unwrap();
      window.scrollTo(0, 0);
      dispatch(setMessage(res.message));
      reset();
    } catch (err: any) {
      dispatch(setMessage(err.data?.message));
    }
  });

  return {
    methods,
    submitHandler,
  };
};
