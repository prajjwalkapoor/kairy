import classnames from 'classnames';
import React, {useContext, useState, useEffect} from 'react';
import {browser} from 'webextension-polyfill-ts';
import {getIcon} from '../../../utils/geticon';
import {ContextProvider} from '../../context/context';
import styles from './PopupButtons.module.scss';

const PopupButtons: React.FC = () => {
  const {state} = useContext(ContextProvider);
  const [shortcutList, setshortcutList] = useState([]);
  const [spaceList, setSpaceList] = useState([]);
  useEffect(() => {
    browser.storage.local.get().then((res) => {
      setshortcutList(res.shortcutList);
      setSpaceList(res.spaceList);
    });
  }, []);
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
      <button
        className={classnames(styles.button, styles.cancelButton)}
        type='button'
        onClick={(): void => {
          window.close();
        }}
      >
        Cancel
      </button>
      <button
        className={classnames(styles.button, styles.saveButton)}
        type='button'
        onClick={saveHandler}
      >
        Save
      </button>
    </div>
  );
};
export default PopupButtons;
