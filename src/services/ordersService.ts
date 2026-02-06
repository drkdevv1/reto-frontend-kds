import { type Order, type OrderItem, OrderStatus } from '../types/order.types';

// Mock data for food items
const FOOD_ITEMS = [
  'Hamburguesa Clásica',
  'Hamburguesa con Queso',
  'Pizza Margarita',
  'Pizza Pepperoni',
  'Ensalada César',
  'Papas Fritas',
  'Nuggets de Pollo',
  'Alitas de Pollo',
  'Hot Dog',
  'Burrito',
  'Tacos',
  'Nachos',
  'Coca Cola',
  'Sprite',
  'Agua Mineral',
  'Jugo de Naranja',
  'Café',
  'Té Helado',
];

const NOTES = [
  'Sin cebolla',
  'Extra queso',
  'Bien cocido',
  'Sin salsa',
  'Para llevar',
  'Sin tomate',
  'Picante',
  '',
  '',
  '',
];

// PERSISTENT STATE - Simula una base de datos en memoria
let ordersDatabase: Order[] = [];
let orderCounter = 1;
let isInitialized = false;

const generateOrderNumber = (): string => {
  const paddedNumber = orderCounter.toString().padStart(4, '0');
  orderCounter++;
  return `#${paddedNumber}`;
};

const generateRandomItems = (): OrderItem[] => {
  const itemCount = Math.floor(Math.random() * 4) + 1; // 1-4 items
  const items: OrderItem[] = [];

  for (let i = 0; i < itemCount; i++) {
    const randomFood = FOOD_ITEMS[Math.floor(Math.random() * FOOD_ITEMS.length)];
    const randomNote = NOTES[Math.floor(Math.random() * NOTES.length)];
    const quantity = Math.floor(Math.random() * 3) + 1; // 1-3 quantity

    items.push({
      id: `item-${Date.now()}-${i}`,
      name: randomFood,
      quantity,
      notes: randomNote || undefined,
    });
  }

  return items;
};

const createNewOrder = (status: OrderStatus = OrderStatus.PENDING): Order => {
  const createdAt = new Date();

  return {
    id: `order-${Date.now()}-${Math.random()}`,
    orderNumber: generateOrderNumber(),
    items: generateRandomItems(),
    status,
    createdAt,
    completedAt: status === OrderStatus.COMPLETED ? new Date() : undefined,
    estimatedTime: Math.floor(Math.random() * 20) + 10, // 10-30 minutes
  };
};

// Inicializar la base de datos con pedidos iniciales
const initializeOrders = () => {
  if (isInitialized) return;
  
  // Generar 6-8 pedidos iniciales con diferentes estados
  const initialCount = Math.floor(Math.random() * 3) + 6; // 6-8 pedidos
  
  for (let i = 0; i < initialCount; i++) {
    let status: OrderStatus;
    
    // Distribución más realista
    const rand = Math.random();
    if (rand < 0.5) {
      status = OrderStatus.PENDING;
    } else if (rand < 0.75) {
      status = OrderStatus.IN_PROGRESS;
    } else {
      status = OrderStatus.COMPLETED;
    }
    
    const order = createNewOrder(status);
    
    // Variar las fechas de creación (últimos 30 minutos)
    const minutesAgo = Math.floor(Math.random() * 30);
    order.createdAt = new Date(Date.now() - minutesAgo * 60000);
    
    ordersDatabase.push(order);
  }
  
  // Ordenar por fecha de creación, más recientes primero
  ordersDatabase.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  isInitialized = true;
};

// Simular llegada de nuevos pedidos (llamado en cada polling)
const checkForNewOrders = (): Order[] => {
  // 30% de probabilidad de que llegue un nuevo pedido
  const shouldAddOrder = Math.random() < 0.3;
  
  if (shouldAddOrder) {
    const newOrder = createNewOrder(OrderStatus.PENDING);
    ordersDatabase.unshift(newOrder); // Agregar al principio
  }
  
  return [...ordersDatabase];
};

// API para obtener pedidos (simula llamada al backend)
export const fetchOrdersAPI = async (): Promise<Order[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Primera vez: inicializar
      if (!isInitialized) {
        initializeOrders();
      } else {
        // Subsecuentes llamadas: verificar nuevos pedidos
        checkForNewOrders();
      }
      
      resolve([...ordersDatabase]);
    }, 300); // Simular latencia de red
  });
};

// API para actualizar estado de pedido (simula llamada al backend)
export const updateOrderStatusAPI = async (
  id: string,
  status: OrderStatus
): Promise<{ id: string; status: OrderStatus }> => {
  const order = ordersDatabase.find((o) => o.id === id);
  if (order) {
    order.status = status;
    if (status === OrderStatus.COMPLETED) {
      order.completedAt = new Date();
    }
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, status });
    }, 200);
  });
};
