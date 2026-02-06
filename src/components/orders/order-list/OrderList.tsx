import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { type Order } from '../../../types/order.types';
import { OrderCard } from '../order-card/OrderCard';
import { MdInbox, MdChevronLeft, MdChevronRight } from 'react-icons/md';

interface OrderListProps {
  orders: Order[];
  onStart?: (id: string) => void;
  onComplete?: (id: string) => void;
  onCancel?: (id: string) => void;
}

const ListContainer = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 140px);
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  align-items: center; /* Center content vertically */
`;

const ScrollContainer = styled.div<{ $isDragging: boolean }>`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg} 60px; /* Add padding for arrows */
  overflow-x: auto;
  overflow-y: hidden;
  height: 100%;
  align-items: flex-start;
  scroll-behavior: ${({ $isDragging }) => ($isDragging ? 'auto' : 'smooth')};
  scroll-snap-type: ${({ $isDragging }) => ($isDragging ? 'none' : 'x mandatory')};
  cursor: ${({ $isDragging }) => ($isDragging ? 'grabbing' : 'grab')};
  width: 100%;
  
  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.gray[300]};
    border-radius: 4px;
    
    &:hover {
      background: ${({ theme }) => theme.colors.gray[400]};
    }
  }

  /* Prevent text selection while dragging */
  user-select: none;
`;

const CardWrapper = styled.div`
  min-width: 320px;
  max-width: 320px;
  height: 100%;
  scroll-snap-align: start;
  flex-shrink: 0;
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  pointer-events: auto; /* Ensure cliks work inside */
`;

const EmptyState = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const EmptyIcon = styled.div`
  font-size: 5rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  opacity: 0.3;
`;

const NavButton = styled.button<{ $position: 'left' | 'right'; $visible: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.md};
  color: ${({ theme }) => theme.colors.text.primary};
  
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  /* Visibility logic: Opacity for smooth transition */
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary[50]};
    color: ${({ theme }) => theme.colors.primary[600]};
    transform: translateY(-50%) scale(1.1);
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }

  svg {
    font-size: 2rem;
  }

  /* Default Positioning (Small Desktop / Laptop): Inside Overlay */
  ${({ $position }) => ($position === 'left' ? 'left: 20px;' : 'right: 20px;')}

  /* Large Desktop: Move Outside */
  @media (min-width: 1600px) {
    ${({ $position }) => ($position === 'left' ? 'left: -70px;' : 'right: -70px;')}
  }

  /* Tablet / Mobile: Hide Arrows (Use Touch/Drag) */
  @media (max-width: 1024px) {
    display: none;
  }
`;

export const OrderList = ({ orders, onStart, onComplete, onCancel }: OrderListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Check scroll position to toggle arrows
  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

    // Show left arrow if verified we scraped past start
    setShowLeftArrow(scrollLeft > 10);
    // Show right arrow if not at the very end (with tolerance)
    setShowRightArrow(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [orders]);

  // DRAG HANDLERS
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll-fast speed
    scrollRef.current.scrollLeft = scrollLeft - walk;
    checkScroll();
  };

  // BUTTON HANDLERS
  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 350; // Approximatel card width + gap
    const targetScroll = scrollRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);

    scrollRef.current.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });

    // Update arrows after animation
    setTimeout(checkScroll, 350);
  };


  if (orders.length === 0) {
    return (
      <ListContainer>
        <EmptyState>
          <EmptyIcon><MdInbox /></EmptyIcon>
          <h3>No hay pedidos activos</h3>
        </EmptyState>
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      <NavButton
        $position="left"
        $visible={showLeftArrow}
        onClick={() => scroll('left')}
        aria-label="Scroll left"
      >
        <MdChevronLeft />
      </NavButton>

      <ScrollContainer
        ref={scrollRef}
        $isDragging={isDragging}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onScroll={checkScroll}
      >
        {orders.map((order) => (
          <CardWrapper key={order.id}>
            <OrderCard
              order={order}
              onStart={onStart}
              onComplete={onComplete}
              onCancel={onCancel}
            />
          </CardWrapper>
        ))}
      </ScrollContainer>

      <NavButton
        $position="right"
        $visible={showRightArrow}
        onClick={() => scroll('right')}
        aria-label="Scroll right"
      >
        <MdChevronRight />
      </NavButton>
    </ListContainer>
  );
};
