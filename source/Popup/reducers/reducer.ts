import {nanoid} from 'nanoid';
import {IAction, IState} from './types';

export const initialState: IState = {
  id: nanoid(),
  title: '',
  url: '',
  category: 'all',
  spaceTags: [],
  shortcutCategories: [],
  spaceCategories: [],
  activeTab: 'shortcut',
  isSubmitDisabled: false,
};

export const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case 'SET_ID':
      return {
        ...state,
        id: action.payload,
      };
    case 'SET_TITLE':
      return {
        ...state,
        title: action.payload,
      };
    case 'SET_URL':
      return {
        ...state,
        url: action.payload,
      };
    case 'SET_CATEGORY':
      return {
        ...state,
        category: action.payload,
      };
    case 'SET_SPACE_TAGS':
      return {
        ...state,
        spaceTags: action.payload,
      };
    case 'SET_SHORTCUT_CATEGORIES':
      return {
        ...state,
        shortcutCategories: action.payload,
      };
    case 'SET_SPACE_CATEGORIES':
      return {
        ...state,
        spaceCategories: action.payload,
      };
    case 'SET_ACTIVE_TAB':
      return {
        ...state,
        activeTab: action.payload,
      };
    case 'SET_IS_SUBMIT_DISABLED':
      return {
        ...state,
        isSubmitDisabled: action.payload,
      };
    default:
      return state;
  }
};
