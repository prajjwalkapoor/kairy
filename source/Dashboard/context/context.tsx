import React, {createContext, useReducer, useEffect} from 'react';
import {browser} from 'webextension-polyfill-ts';
import {initialState, reducer} from '../reducers/reducer';
import {ContextProps, ContextValueProps} from './types';

export const ContextProvider = createContext<ContextValueProps>({
  state: initialState,
  dispatch: () => {},
});
const ContextProvide = ({children}: ContextProps): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    browser.storage.local.get().then((res) => {
      res.shortcutList
        ? dispatch({type: 'SET_SHORTCUT_LIST', payload: res.shortcutList})
        : dispatch({type: 'SET_SHORTCUT_LIST', payload: []});

      res.spaceList
        ? dispatch({type: 'SET_SPACE_LIST', payload: res.spaceList})
        : dispatch({type: 'SET_SPACE_LIST', payload: []});
      res.activeShortcutCategory
        ? dispatch({
            type: 'SET_ACTIVE_SHORTCUT_CATEGORY',
            payload: res.activeShortcutCategory,
          })
        : dispatch({
            type: 'SET_ACTIVE_SHORTCUT_CATEGORY',
            payload: 'all',
          });
      res.shortcutCategoryList
        ? dispatch({
            type: 'SET_SHORTCUT_CATEGORY_LIST',
            payload: res.shortcutCategoryList,
          })
        : dispatch({type: 'SET_SHORTCUT_CATEGORY_LIST', payload: []});
      res.spaceCategoryList
        ? dispatch({
            type: 'SET_SPACE_CATEGORY_LIST',
            payload: res.spaceCategoryList,
          })
        : dispatch({type: 'SET_SPACE_CATEGORY_LIST', payload: []});
    });
  }, []);

  return (
    <ContextProvider.Provider value={{state, dispatch}}>
      {children}
    </ContextProvider.Provider>
  );
};
export default ContextProvide;
