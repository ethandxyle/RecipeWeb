import { createContext, useContext } from 'react';

export const ThemeToggleContext = createContext({ toggleTheme: () => {} });
export const useThemeToggle = () => useContext(ThemeToggleContext);
