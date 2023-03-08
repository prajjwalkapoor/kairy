import React, { createContext, useEffect, useReducer } from 'react';
import { browser } from 'webextension-polyfill-ts';
import { initialState, reducer } from '../reducers/reducer';
import { ContextProps, ContextValueProps } from './types';

export const ContextProvider = createContext<ContextValueProps>({
  state: initialState,
  dispatch: () => {
    return;
  },
});
const ContextProvide = ({ children }: ContextProps): JSX.Element => {
  const setTheme = (): void => {
    const theme = localStorage.getItem('kairy.theme');
    if (theme) {
      const root = document.querySelector(':root')!;
      root.setAttribute('theme', theme);
    } else {
      const root = document.querySelector(':root')!;
      root.setAttribute('theme', 'light');
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    browser.storage.local.get().then((res) => {
      if (
        !res.shortcutList &&
        !res.spaceList &&
        !res.activeShortcutCategory &&
        !res.shortcutCategoryList &&
        !res.spaceCategoryList
      ) {
        browser.storage.local.set({
          shortcutList: [],
          spaceList: [],
          activeShortcutCategory: 'all',
          shortcutCategoryList: [],
          spaceCategoryList: [],
        });
      }
    });
    setTheme();
  }, [state]);
  return (
    <ContextProvider.Provider value={{ state, dispatch }}>
      {children}
    </ContextProvider.Provider>
  );
};

export default ContextProvide;
