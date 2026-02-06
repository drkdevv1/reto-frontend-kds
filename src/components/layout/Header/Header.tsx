import styled from 'styled-components';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { useTheme } from '../../../hooks/useTheme';

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  padding-top: ${({ theme }) => theme.spacing.sm};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  padding-left: ${({ theme }) => theme.spacing.xl};
  padding-right: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.md};
  position: sticky;
  top: 0;
  z-index: 100;
  height: auto;
`;

const HeaderContent = styled.div`
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 700;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const Subtitle = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.875rem;
  font-weight: 400;
  margin-left: ${({ theme }) => theme.spacing.sm};

  @media (max-width: 768px) {
    display: none;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ThemeToggle = styled.button`
  background-color: ${({ theme }) => theme.colors.primary[100]};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  padding: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  font-size: 1.25rem;
  transition: all ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: ${({ theme }) => theme.colors.primary[700]};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary[200]};
    transform: scale(1.1) rotate(15deg);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const Header = () => {
  const { themeMode, toggleTheme } = useTheme();

  return (
    <HeaderContainer>
      <HeaderContent>
        <LeftSection>
          <Title>
            Kitchen Display System
            <Subtitle>Gestión de Pedidos</Subtitle>
          </Title>
        </LeftSection>
        <RightSection>
          <ThemeToggle onClick={toggleTheme} title="Cambiar tema" aria-label="Toggle theme">
            {themeMode === 'light' ? <MdDarkMode /> : <MdLightMode />}
          </ThemeToggle>
        </RightSection>
      </HeaderContent>
    </HeaderContainer>
  );
};
