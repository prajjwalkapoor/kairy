export interface Shortcut {
  id: string;
  title: string;
  url: string;
  category: string;
  icon: string;
  modifiedOn: string;
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
  id: string;
  title: string;
  url: string;
  category: string;
  spaceTags: Array<string>;
  shortcutCategories: Array<string>;
  spaceCategories: Array<string>;
  activeTab: 'shortcut' | 'space';
  isSubmitDisabled: boolean;
}
export interface IAction {
  type:
    | 'SET_ID'
    | 'SET_TITLE'
    | 'SET_URL'
    | 'SET_CATEGORY'
    | 'SET_SPACE_TAGS'
    | 'SET_SHORTCUT_CATEGORIES'
    | 'SET_SPACE_CATEGORIES'
    | 'SET_ACTIVE_TAB'
    | 'SET_IS_SUBMIT_DISABLED';
  payload: any;
}
