import {IAction, IState} from './types';

export const initialState = {
  shortcutList: [],
  spaceList: [],
  activeShortcutCategory: 'All Categories',
  shortcutCategoryList: [],
  spaceCategoryList: [],
  mapper: [],
};
export const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case 'SET_SHORTCUT_LIST':
      return {
        ...state,
        shortcutList: action.payload,
      };
    case 'SET_ACTIVE_SHORTCUT_CATEGORY':
      return {
        ...state,
        activeShortcutCategory: action.payload,
      };
    case 'SET_SHORTCUT_CATEGORY_LIST':
      return {
        ...state,
        shortcutCategoryList: action.payload,
      };
    case 'SET_SPACE_LIST':
      return {
        ...state,
        spaceList: action.payload,
      };
    case 'SET_SPACE_CATEGORY_LIST':
      return {
        ...state,
        spaceCategoryList: action.payload,
      };
    case 'SET_MAPPER':
      return {
        ...state,
        mapper: action.payload,
      };
    default:
      return state;
  }
};
