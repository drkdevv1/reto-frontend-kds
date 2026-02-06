import { createAsyncThunk } from '@reduxjs/toolkit';
import { OrderStatus } from '../../types/order.types';
import { fetchOrdersAPI, updateOrderStatusAPI } from '../../services/ordersService';

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const orders = await fetchOrdersAPI();
  return orders;
});

export const updateOrderStatusThunk = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ id, status }: { id: string; status: OrderStatus }) => {
    const result = await updateOrderStatusAPI(id, status);
    return result;
  }
);
