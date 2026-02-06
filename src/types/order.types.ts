// Order Status - Using const object instead of enum for better compatibility
export const OrderStatus = {
  PENDING: 'pending',
  IN_PROGRESS: 'inProgress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];

// Order Item Interface
export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  notes?: string;
}

// Main Order Interface
export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  status: OrderStatus;
  createdAt: Date;
  completedAt?: Date;
  estimatedTime?: number; // in minutes
}

// Filter type for order filtering
export type OrderFilter = 'all' | 'pending' | 'inProgress' | 'completed';

