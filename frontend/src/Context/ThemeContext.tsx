import React, { createContext, useState, useMemo, useContext } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '../theme';

const ThemeToggleContext = createContext({ toggleTheme: () => {} });

export const useThemeToggle = () => useContext(ThemeToggleContext);

export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [mode, setMode] = useState<'light' | 'dark'>('light');
    const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

    const toggleTheme = () => setMode(prev => (prev === 'light' ? 'dark' : 'light'));

    return (
        <ThemeToggleContext.Provider value={{ toggleTheme }}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeToggleContext.Provider>
    );
};
