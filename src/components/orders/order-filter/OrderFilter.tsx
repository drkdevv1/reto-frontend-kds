import styled from 'styled-components';
import { type OrderFilter as OrderFilterType } from '../../../types/order.types';
import { MdFilterList } from 'react-icons/md';

interface OrderFilterProps {
  currentFilter: OrderFilterType;
  onFilterChange: (filter: OrderFilterType) => void;
  orderCounts: {
    all: number;
    pending: number;
    inProgress: number;
    completed: number;
  };
}

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  background-color: ${({ theme }) => theme.colors.background};
  overflow-x: auto;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  /* Hide scrollbar */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

const FilterLabel = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: 600;
  font-size: 0.875rem;
  white-space: nowrap;

  svg {
    font-size: 1.125rem;
  }
`;

const FilterButton = styled.button<{ $isActive: boolean }>`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  border: 2px solid ${({ $isActive, theme }) =>
    $isActive ? theme.colors.primary[500] : theme.colors.border};
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.primary[500] : theme.colors.surface};
  color: ${({ $isActive, theme }) =>
    $isActive ? '#FFFFFF' : theme.colors.text.primary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  min-height: 36px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const Count = styled.span<{ $isActive: boolean }>`
  background-color: ${({ $isActive, theme }) =>
    $isActive ? 'rgba(255, 255, 255, 0.3)' : theme.colors.gray[200]};
  color: ${({ $isActive, theme }) =>
    $isActive ? '#FFFFFF' : theme.colors.text.primary};
  padding: 2px 8px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: 700;
  min-width: 24px;
  text-align: center;
`;

export const OrderFilter = ({ currentFilter, onFilterChange, orderCounts }: OrderFilterProps) => {
  const filters: Array<{ key: OrderFilterType; label: string; count: number }> = [
    { key: 'all', label: 'Todos', count: orderCounts.all },
    { key: 'pending', label: 'Pendientes', count: orderCounts.pending },
    { key: 'inProgress', label: 'En Proceso', count: orderCounts.inProgress },
    { key: 'completed', label: 'Completados', count: orderCounts.completed },
  ];

  return (
    <FilterContainer>
      <FilterLabel>
        <MdFilterList />
        <span>Filtrar:</span>
      </FilterLabel>
      {filters.map((filter) => (
        <FilterButton
          key={filter.key}
          $isActive={currentFilter === filter.key}
          onClick={() => onFilterChange(filter.key)}
        >
          {filter.label}
          <Count $isActive={currentFilter === filter.key}>{filter.count}</Count>
        </FilterButton>
      ))}
    </FilterContainer>
  );
};
