import {useState, useEffect} from 'react';
import {browser} from 'webextension-polyfill-ts';

type IUseTheme = {
  theme: string;
  toggleTheme: () => void;
};
const useTheme = (): IUseTheme => {
  const [theme, setTheme] = useState('');
  const root = document.querySelector(':root')!;
  useEffect(() => {
    browser.storage.local.get('preferences').then((res) => {
      if (res.preferences?.theme) {
        setTheme(res.preferences.theme);
      } else {
        setTheme('light');
      }
    });
  }, []);
  useEffect(() => {
    root.setAttribute('theme', theme);
    browser.storage.local.get('preferences').then((res) => {
      if (res.preferences) {
        browser.storage.local.set({
          preferences: {
            ...res.preferences,
            theme,
          },
        });
      } else {
        browser.storage.local.set({
          preferences: {
            theme,
          },
        });
      }
    });
  }, [theme, root]);
  const toggleTheme = (): void => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return {theme, toggleTheme};
};

export default useTheme;
