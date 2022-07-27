import classnames from 'classnames';
import React, {useContext, useState, useEffect} from 'react';
import {browser} from 'webextension-polyfill-ts';
import {getIcon} from '../../../utils/geticon';
import {ContextProvider} from '../../context/context';
import {Shortcut, Space} from '../../reducers/types';
import styles from './PopupButtons.module.scss';

const PopupButtons: React.FC = () => {
  const {state} = useContext(ContextProvider);
  const [shortcutList, setshortcutList] = useState([]);
  const [spaceList, setSpaceList] = useState([]);
  const [categoryList, setCategoryList] = useState<string[]>();
  useEffect(() => {
    browser.storage.local.get().then((res) => {
      setshortcutList(res.shortcutList);
      setSpaceList(res.spaceList);
    });
  }, []);

  useEffect(() => {
    browser.storage.local.get().then((res) => {
      if (state.activeTab === 'shortcut') {
        setCategoryList(
          res.shortcutList.map((item: Shortcut) => item.category)
        );
      } else if (state.activeTab === 'space') {
        setCategoryList(res.spaceList.map((item: Space) => item.category));
      }
    });
  }, [state.activeTab]);
  const saveHandler = (): void => {
    if (state.activeTab === 'shortcut') {
      const shortcut = {
        id: state.id,
        title: state.title,
        url: state.url,
        category: state.category,
        icon: getIcon(state.url),
      };
      browser.storage.local.set({
        shortcutList: [...shortcutList, shortcut],
      });
    } else if (state.activeTab === 'space') {
      const space = {
        id: state.id,
        title: state.title,
        url: state.url,
        category: state.category,
        icon: getIcon(state.url),
        tags: state.spaceTags,
      };
      browser.storage.local.set({
        spaceList: [...spaceList, space],
      });
    }
    window.close();
  };

  return (
    <div className={styles.container}>
      {!state.title ||
        (!state.category && (
          <span className={styles.errorMessage}>Fill the required fields</span>
        ))}
      <button
        className={classnames(styles.button, styles.cancelButton)}
        type='button'
        onClick={(): void => {
          // window.close();
          browser.storage.local.clear();
        }}
      >
        Cancel
      </button>
      <button
        className={classnames(styles.button, styles.saveButton)}
        type='button'
        onClick={saveHandler}
        disabled={
          !state.category ||
          !state.title ||
          categoryList?.includes(state.category)
        }
      >
        Save
      </button>
    </div>
  );
};
export default PopupButtons;
