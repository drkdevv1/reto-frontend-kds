import styled from 'styled-components';
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  padding: ${({ size, theme }) => {
        switch (size) {
            case 'sm':
                return `${theme.spacing.xs} ${theme.spacing.sm}`;
            case 'lg':
                return `${theme.spacing.md} ${theme.spacing.lg}`;
            default:
                return `${theme.spacing.sm} ${theme.spacing.md}`;
        }
    }};
  font-size: ${({ size }) => {
        switch (size) {
            case 'sm':
                return '0.875rem';
            case 'lg':
                return '1.125rem';
            default:
                return '1rem';
        }
    }};
  font-weight: 600;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};

  background-color: ${({ variant, theme }) => {
        switch (variant) {
            case 'primary':
                return theme.colors.primary[500];
            case 'secondary':
                return theme.colors.secondary[500];
            case 'success':
                return theme.colors.status.success;
            case 'danger':
                return theme.colors.status.error;
            case 'ghost':
                return 'transparent';
            default:
                return theme.colors.primary[500];
        }
    }};

  color: ${({ variant, theme }) => {
        if (variant === 'ghost') {
            return theme.colors.text.primary;
        }
        return '#FFFFFF';
    }};

  border: ${({ variant, theme }) => {
        if (variant === 'ghost') {
            return `1px solid ${theme.colors.border}`;
        }
        return 'none';
    }};

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.md};
    
    background-color: ${({ variant, theme }) => {
        switch (variant) {
            case 'primary':
                return theme.colors.primary[600];
            case 'secondary':
                return theme.colors.secondary[600];
            case 'success':
                return theme.colors.status.success;
            case 'danger':
                return theme.colors.status.error;
            case 'ghost':
                return theme.colors.gray[100];
            default:
                return theme.colors.primary[600];
        }
    }};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Button = ({
    variant = 'primary',
    size = 'md',
    children,
    ...props
}: ButtonProps) => {
    return (
        <StyledButton variant={variant} size={size} {...props}>
            {children}
        </StyledButton>
    );
};
