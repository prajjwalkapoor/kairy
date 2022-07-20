import React, {createContext, useReducer} from 'react';
import {initialState, reducer} from '../reducers/reducer';
import {contextProps, contextValueProps} from './types';

export const ContextProvider = createContext<contextValueProps>({
  state: initialState,
  dispatch: () => {},
});
const ContextProvide = ({children}: contextProps): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ContextProvider.Provider value={{state, dispatch}}>
      {children}
    </ContextProvider.Provider>
  );
};

export default ContextProvide;
