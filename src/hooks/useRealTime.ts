import { useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';
import { fetchOrders } from '../features/orders/ordersThunks';
import { setOrders } from '../features/orders/ordersSlice';

export const useRealTime = (intervalMs: number = 5000) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Initial fetch
    dispatch(fetchOrders()).then((result) => {
      if (result.payload) {
        dispatch(setOrders(result.payload as any));
      }
    });

    // Set up polling
    const interval = setInterval(() => {
      dispatch(fetchOrders()).then((result) => {
        if (result.payload) {
          dispatch(setOrders(result.payload as any));
        }
      });
    }, intervalMs);

    // Cleanup
    return () => clearInterval(interval);
  }, [dispatch, intervalMs]);
};
