import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeMode, ThemeConfig, THEMES } from '../types/theme';

interface ThemeContextType {
  themeMode: ThemeMode;
  theme: ThemeConfig;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  themeMode: 'girly_rose',
  theme: THEMES.girly_rose,
  setThemeMode: () => {}
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('os_worksheets_theme');
    if (saved && saved in THEMES) {
      return saved as ThemeMode;
    }
    return 'girly_rose'; // Default to the delightful girly rose theme!
  });

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    localStorage.setItem('os_worksheets_theme', mode);
  };

  const theme = THEMES[themeMode] || THEMES.girly_rose;

  return (
    <ThemeContext.Provider value={{ themeMode, theme, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
