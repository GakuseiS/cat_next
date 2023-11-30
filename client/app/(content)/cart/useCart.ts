import { useRouter } from 'next/navigation';
import { useDeleteBasketItemMutation, useDeleteBasketMutation, useGetBasketQuery } from '@/api/card/card.queries';
import { usePostOrderMutation } from '@/api/order/order.queries';
import { ROUTES } from '@/global/routes';
import { useAppDispatch } from '@/store/store.hook';
import { setMessage } from '@/store/toastSlice';

export const useCart = () => {
  const router = useRouter();
  const { data: cartList, isLoading } = useGetBasketQuery();
  const [clearCard] = useDeleteBasketMutation();
  const [deleteItem] = useDeleteBasketItemMutation();
  const [postOrder] = usePostOrderMutation();
  const dispatch = useAppDispatch();

  const clearCardHandler = async () => {
    try {
      const data = await clearCard().unwrap();
      dispatch(setMessage(data.message));
    } catch (err: any) {
      dispatch(setMessage(err.data?.message));
      console.error('Ошибка очищения корзины');
    }
  };

  const deleteItemHandler = async (id: string) => {
    try {
      const data = await deleteItem({ id }).unwrap();
      dispatch(setMessage(data.message));
    } catch (err: any) {
      dispatch(setMessage(err.data?.message));
      console.error('Ошибка удаления из корзины');
    }
  };

  const postOrderHandler = async (id: number) => {
    try {
      await postOrder({ id });
      router.push(ROUTES.ordersPage);
    } catch (err: any) {
      dispatch(setMessage(err.data?.message));
      console.error('Ошибка отправки заказа');
    }
  };

  return {
    isLoading,
    cartList,
    deleteItemHandler,
    postOrderHandler,
    clearCardHandler,
  };
};
