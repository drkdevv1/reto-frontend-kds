import { useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { OrderStatus } from '../types/order.types';
import { updateOrderStatus, setFilter } from '../features/orders/ordersSlice';
import { updateOrderStatusThunk } from '../features/orders/ordersThunks';

export const useOrders = () => {
  const dispatch = useAppDispatch();
  const { items, filter, loading, error } = useAppSelector((state) => state.orders);

  // Filter orders based on current filter
  const filteredOrders = useMemo(() => {
    if (filter === 'all') return items;
    
    const filterMap = {
      pending: OrderStatus.PENDING,
      inProgress: OrderStatus.IN_PROGRESS,
      completed: OrderStatus.COMPLETED,
    };

    return items.filter((order) => order.status === filterMap[filter as keyof typeof filterMap]);
  }, [items, filter]);

  const changeFilter = (newFilter: string) => {
    dispatch(setFilter(newFilter as any));
  };

  const startOrder = (id: string) => {
    dispatch(updateOrderStatus({ id, status: OrderStatus.IN_PROGRESS }));
    dispatch(updateOrderStatusThunk({ id, status: OrderStatus.IN_PROGRESS }));
  };

  const completeOrder = (id: string) => {
    dispatch(updateOrderStatus({ id, status: OrderStatus.COMPLETED }));
    dispatch(updateOrderStatusThunk({ id, status: OrderStatus.COMPLETED }));
  };

  const cancelOrder = (id: string) => {
    dispatch(updateOrderStatus({ id, status: OrderStatus.CANCELLED }));
    dispatch(updateOrderStatusThunk({ id, status: OrderStatus.CANCELLED }));
  };

  return {
    orders: filteredOrders,
    allOrders: items,
    filter,
    loading,
    error,
    changeFilter,
    startOrder,
    completeOrder,
    cancelOrder,
  };
};
