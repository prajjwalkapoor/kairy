import {useState, useEffect} from 'react';

type IUseTheme = {
  theme: string;
  toggleTheme: () => void;
};
const useTheme = (): IUseTheme => {
  const [theme, setTheme] = useState('');
  const root = document.querySelector(':root')!;
  useEffect(() => {
    if (window.localStorage.getItem('kairy.theme')) {
      setTheme(window.localStorage.getItem('kairy.theme')!);
    } else {
      window.localStorage.setItem('kairy.theme', 'light');
      setTheme('light');
    }
  }, []);
  useEffect(() => {
    root.setAttribute('theme', theme);
    window.localStorage.setItem('kairy.theme', theme);
  }, [theme, root]);
  const toggleTheme = (): void => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return {theme, toggleTheme};
};

export default useTheme;
