import {IAction, IState, Shortcut} from './types';

export const initialState = {
  shortcutList: [],
  spaceList: [],
  activeShortcutCategory: 'All Categories',
  shortcutCategoryList: [],
  spaceCategoryList: [],
  mapper: [],
  preferences: {
    searchSource: 'Shortcuts',
    theme: 'light',
    urlNewTab: false,
  },
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
      action.payload.sort((a: Shortcut, b: Shortcut) => {
        if (a.isPinned && !b.isPinned) {
          return -1;
        }
        if (!a.isPinned && b.isPinned) {
          return 1;
        }
        return 0;
      });
      return {
        ...state,
        mapper: action.payload,
      };
    case 'SET_PREFERENCES':
      return {
        ...state,
        preferences: action.payload,
      };
    default:
      return state;
  }
};
