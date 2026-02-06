import { createContext, useState, useEffect, type ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { type ThemeMode } from '../types/theme.types';
import { lightTheme, darkTheme } from '../styles/theme';
import { GlobalStyles } from '../styles/GlobalStyles';

interface ThemeContextType {
    themeMode: ThemeMode;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
    children: ReactNode;
}

const THEME_STORAGE_KEY = 'kds-theme-mode';

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        return (savedTheme as ThemeMode) || 'light';
    });

    useEffect(() => {
        localStorage.setItem(THEME_STORAGE_KEY, themeMode);
    }, [themeMode]);

    const toggleTheme = () => {
        setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    const theme = themeMode === 'light' ? lightTheme : darkTheme;

    return (
        <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
            <StyledThemeProvider theme={theme}>
                <GlobalStyles />
                {children}
            </StyledThemeProvider>
        </ThemeContext.Provider>
    );
};
