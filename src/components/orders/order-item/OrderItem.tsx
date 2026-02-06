import styled from 'styled-components';
import { type OrderItem as OrderItemType } from '../../../types/order.types';

interface OrderItemProps {
  item: OrderItemType;
  index: number;
  total: number;
}

const ItemContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding: ${({ theme }) => theme.spacing.sm} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-family: inherit;

  &:last-child {
    border-bottom: none;
  }
`;

const ItemCount = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: 600;
  width: 32px;
  padding-top: 2px;
`;

const ItemInfo = styled.div`
  flex: 1;
  padding: 0 ${({ theme }) => theme.spacing.sm};
`;

const ItemName = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 0.9375rem;
  line-height: 1.3;
`;

const ItemNotes = styled.div`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.primary[500]};
  margin-top: 4px;
  font-weight: 500;
`;

const ItemQuantity = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  padding-left: ${({ theme }) => theme.spacing.sm};
  padding-top: 2px;
`;

export const OrderItem = ({ item, index, total }: OrderItemProps) => {
  return (
    <ItemContainer>
      <ItemCount>
        {index + 1}/{total}
      </ItemCount>
      <ItemInfo>
        <ItemName>{item.name}</ItemName>
        {item.notes && <ItemNotes>{item.notes}</ItemNotes>}
      </ItemInfo>
      <ItemQuantity>{item.quantity}</ItemQuantity>
    </ItemContainer>
  );
};
