import { useCallback, useEffect, useState } from 'react';
import { TYPING_THEME } from '@/constants';

export type ThemeType = 'light' | 'dark';
export type UseThemeReturnType = {
  theme: ThemeType | null;
  setTheme: (theme: ThemeType) => void;
};

const useTheme = () => {
  const [activeTheme, setActiveTheme] = useState<ThemeType | null>(null);

  useEffect(() => {
    const localTheme = window.localStorage.getItem(TYPING_THEME);

    if (!localTheme) {
      window.localStorage.setItem(TYPING_THEME, 'light');
      window.document.documentElement.classList.add('light');
      setActiveTheme('light');
    } else {
      window.document.documentElement.classList.add(localTheme);
      setActiveTheme(localTheme as ThemeType);
    }
  }, []);

  const setTheme = useCallback((theme: ThemeType) => setActiveTheme(theme), []);

  useEffect(() => {
    if (!activeTheme) return;
    window.localStorage.setItem(TYPING_THEME, activeTheme);
    if (activeTheme === 'light') {
      window.document.documentElement.classList.add('light');
      window.document.documentElement.classList.remove('dark');
    } else {
      window.document.documentElement.classList.add('dark');
      window.document.documentElement.classList.remove('light');
    }
  }, [activeTheme]);

  return { theme: activeTheme, setTheme };
};

export default useTheme;
