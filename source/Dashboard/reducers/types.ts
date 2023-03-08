export interface Shortcut {
  id: string;
  title: string;
  url: string;
  category: string;
  icon: string;
  modifiedOn: string;
  isPinned: boolean;
}
export interface Space {
  id: string;
  title: string;
  url: string;
  category: string;
  icon: string;
  tags: string[];
}
export interface IState {
  shortcutList: Shortcut[];
  activeShortcutCategory: string;
  shortcutCategoryList: string[];
  spaceList: Space[];
  spaceCategoryList: string[];
  mapper: Shortcut[];
  preferences: {
    searchSource: string;
    theme: string;
    urlNewTab: boolean;
  };
}
export interface IAction {
  type:
    | 'SET_SHORTCUT_LIST'
    | 'SET_SPACE_LIST'
    | 'SET_ACTIVE_SHORTCUT_CATEGORY'
    | 'SET_SHORTCUT_CATEGORY_LIST'
    | 'SET_SPACE_CATEGORY_LIST'
    | 'SET_MAPPER'
    | 'SET_PREFERENCES';
  payload: any;
}
