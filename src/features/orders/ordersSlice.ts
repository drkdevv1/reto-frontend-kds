import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type Order, type OrderFilter, OrderStatus } from '../../types/order.types';

interface OrdersState {
  items: Order[];
  filter: OrderFilter;
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  items: [],
  filter: 'all',
  loading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      const newOrders = action.payload;
      const currentOrdersMap = new Map(state.items.map(o => [o.id, o]));
      
      const mergedOrders: Order[] = [];
      
      for (const serverOrder of newOrders) {
        if (currentOrdersMap.has(serverOrder.id)) {
          mergedOrders.push(currentOrdersMap.get(serverOrder.id)!);
        } else {
          mergedOrders.push(serverOrder);
        }
      }
      
      state.items = mergedOrders;
      state.loading = false;
      state.error = null;
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.items.unshift(action.payload);
    },
    updateOrderStatus: (state, action: PayloadAction<{ id: string; status: OrderStatus }>) => {
      const order = state.items.find((o) => o.id === action.payload.id);
      if (order) {
        order.status = action.payload.status;
        if (action.payload.status === OrderStatus.COMPLETED) {
          order.completedAt = new Date();
        }
      }
    },
    removeOrder: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((o) => o.id !== action.payload);
    },
    setFilter: (state, action: PayloadAction<OrderFilter>) => {
      state.filter = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setOrders,
  addOrder,
  updateOrderStatus,
  removeOrder,
  setFilter,
  setLoading,
  setError,
} = ordersSlice.actions;

export default ordersSlice.reducer;
