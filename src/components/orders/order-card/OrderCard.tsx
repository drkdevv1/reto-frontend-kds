import styled from 'styled-components';
import { type Order, OrderStatus } from '../../../types/order.types';
import { Card } from '../../common/Card/Card';
import { Button } from '../../common/Button/Button';
import { OrderItem } from '../order-item/OrderItem';
import { MdRestaurant } from 'react-icons/md';

interface OrderCardProps {
    order: Order;
    onStart?: (id: string) => void;
    onComplete?: (id: string) => void;
    onCancel?: (id: string) => void;
}

const StyledCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 550px;
  padding: 0; /* Control padding manually for header/footer */
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: none;
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

/* HEADER STYLES */
const CardHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const OrderId = styled.span`
  font-weight: 800;
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const TableNumber = styled.span`
  font-weight: 700;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const StatusRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BadgePill = styled.div<{ status: OrderStatus }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.text.primary}; /* Dark background like reference */
  color: white;
  font-size: 0.8125rem;
  font-weight: 600;

  background-color: ${({ status, theme }) => {
        switch (status) {
            case OrderStatus.PENDING: return theme.colors.secondary[600];
            case OrderStatus.IN_PROGRESS: return theme.colors.primary[600];
            case OrderStatus.COMPLETED: return theme.colors.status.success;
            case OrderStatus.CANCELLED: return theme.colors.gray[600];
            default: return theme.colors.gray[800];
        }
    }};
`;

const TimeDisplay = styled.div`
  text-align: right;
`;

const ClockTime = styled.div`
  font-weight: 700;
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const AgoTime = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: 2px;
`;

/* BODY STYLES */
const CardBody = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.surface};

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.gray[300]};
    border-radius: 10px;
  }
`;

/* FOOTER STYLES */
const CardFooter = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ActionButton = styled(Button)`
  flex: 1;
  justify-content: center;
  font-weight: 700;
  text-transform: capitalize;
  letter-spacing: 0.5px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
`;

/* HELPERS */
const formatTime = (date: Date): { clock: string; ago: string } => {
    const d = new Date(date);
    const clock = `${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`;

    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const ago = diffMins < 1 ? 'Justo ahora' : `${diffMins} min ago`;

    return { clock, ago };
};

const getStatusLabel = (status: OrderStatus) => {
    switch (status) {
        case OrderStatus.PENDING: return 'Pendiente';
        case OrderStatus.IN_PROGRESS: return 'Preparando';
        case OrderStatus.COMPLETED: return 'Listo';
        case OrderStatus.CANCELLED: return 'Cancelado';
        default: return status;
    }
};

export const OrderCard = ({ order, onStart, onComplete, onCancel }: OrderCardProps) => {
    const { clock, ago } = formatTime(order.createdAt);
    const isPending = order.status === OrderStatus.PENDING;
    const isCompleted = order.status === OrderStatus.COMPLETED;

    return (
        <StyledCard>
            <CardHeader>
                <TopRow>
                    <OrderId>{order.orderNumber}</OrderId>
                    <TableNumber>MESA 1</TableNumber> {/* Mock table number for fidelity */}
                </TopRow>
                <StatusRow>
                    <BadgePill status={order.status}>
                        <MdRestaurant /> {getStatusLabel(order.status)}
                    </BadgePill>
                    <TimeDisplay>
                        <ClockTime>{clock}</ClockTime>
                        <AgoTime>{ago}</AgoTime>
                    </TimeDisplay>
                </StatusRow>
            </CardHeader>

            <CardBody>
                {order.items.map((item, index) => (
                    <OrderItem
                        key={item.id}
                        item={item}
                        index={index}
                        total={order.items.length}
                    />
                ))}
            </CardBody>

            <CardFooter>
                {/* Logic for buttons mimicking "Done" and "Print" positions */}
                {!isCompleted && !isPending && (
                    <ActionButton variant="primary" onClick={() => onComplete?.(order.id)}>
                        Listo
                    </ActionButton>
                )}
                {isPending && (
                    <ActionButton variant="secondary" onClick={() => onStart?.(order.id)}>
                        Cocinar
                    </ActionButton>
                )}

                {/* Secondary Action - Styled like "Print" (Orange-ish in concept or Secondary) */}
                {!isCompleted && (
                    <ActionButton
                        variant="ghost"
                        style={{ color: '#F44336', backgroundColor: '#FEE2E2', border: 'none' }}
                        onClick={() => onCancel?.(order.id)}
                    >
                        Cancelar
                    </ActionButton>
                )}
            </CardFooter>
        </StyledCard>
    );
};
