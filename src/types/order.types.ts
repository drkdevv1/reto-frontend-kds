// Order Status Enum
export enum OrderStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'inProgress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

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
