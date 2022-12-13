import React from 'react';
import {IAction, IState} from '../reducers/types';

export interface ContextProps {
  children: React.ReactNode;
}
export interface ContextValueProps {
  state: IState;
  dispatch: React.Dispatch<IAction>;
}
