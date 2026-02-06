import { useMemo } from 'react';
import styled from 'styled-components';
import { Header } from '../../components/layout/Header/Header';
import { OrderFilter } from '../../components/orders/order-filter/OrderFilter';
import { OrderList } from '../../components/orders/order-list/OrderList';
import { useOrders } from '../../hooks/useOrders';
import { useRealTime } from '../../hooks/useRealTime';
import { OrderStatus } from '../../types/order.types';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const MainContent = styled.main`
  max-width: 1400px;
  margin: 0 auto;
`;

const LoadingOverlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1.125rem;
`;

export const KitchenDisplay = () => {
    // Real-time polling
    useRealTime(5000);

    // Orders logic
    const {
        orders,
        allOrders,
        filter,
        loading,
        changeFilter,
        startOrder,
        completeOrder,
        cancelOrder,
    } = useOrders();

    // Calculate order counts for filters
    const orderCounts = useMemo(() => {
        return {
            all: allOrders.length,
            pending: allOrders.filter((o) => o.status === OrderStatus.PENDING).length,
            inProgress: allOrders.filter((o) => o.status === OrderStatus.IN_PROGRESS).length,
            completed: allOrders.filter((o) => o.status === OrderStatus.COMPLETED).length,
        };
    }, [allOrders]);

    return (
        <PageContainer>
            <Header />
            <MainContent>
                <OrderFilter
                    currentFilter={filter}
                    onFilterChange={changeFilter}
                    orderCounts={orderCounts}
                />
                {loading && allOrders.length === 0 ? (
                    <LoadingOverlay>⏳ Cargando pedidos...</LoadingOverlay>
                ) : (
                    <OrderList
                        orders={orders}
                        onStart={startOrder}
                        onComplete={completeOrder}
                        onCancel={cancelOrder}
                    />
                )}
            </MainContent>
        </PageContainer>
    );
};
