import React, {useContext} from 'react';
import classnames from 'classnames';
import styles from './PopupTabs.module.scss';
import {ContextProvider} from '../../context/context';

const PopupTabs: React.FC = () => {
  const {state, dispatch} = useContext(ContextProvider);
  const shortcutClickHandler = (
    e: React.MouseEvent<HTMLButtonElement>
  ): void => {
    e.preventDefault();
    dispatch({type: 'SET_ACTIVE_TAB', payload: 'shortcut'});
  };
  const spaceClickHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    dispatch({type: 'SET_ACTIVE_TAB', payload: 'space'});
  };
  return (
    <section className={styles.container}>
      <button
        className={classnames(
          {[styles.popupTabActive]: state.activeTab === 'shortcut'},
          {[styles.popupTabInactive]: state.activeTab !== 'shortcut'}
        )}
        type='button'
        onClick={shortcutClickHandler}
      >
        Shortcuts
      </button>
      <button
        className={classnames(
          {[styles.popupTabActive]: state.activeTab === 'space'},
          {[styles.popupTabInactive]: state.activeTab !== 'space'}
        )}
        type='button'
        onClick={spaceClickHandler}
      >
        Space
      </button>
    </section>
  );
};
export default PopupTabs;
