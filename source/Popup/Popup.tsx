import React, {useEffect, useContext, useState} from 'react';
import {browser} from 'webextension-polyfill-ts';
import PopupTabs from './components/PopupTabs/PopupTabs';
import styles from './popup.module.scss';
import {ContextProvider} from './context/context';
import ShortcutTab from './components/ShortcutTab/ShortcutTab';
import PopupButtons from './components/PopupButtons/PopupButtons';
import SpaceTab from './components/SpaceTab/SpaceTab';

const Popup: React.FC = () => {
  const {state, dispatch} = useContext(ContextProvider);
  const [customTitle, setCustomTitle] = useState('');
  useEffect(() => {
    browser.tabs
      .query({active: true, currentWindow: true})
      .then((tabs): void => {
        dispatch({type: 'SET_TITLE', payload: customTitle || tabs[0].title});
        dispatch({type: 'SET_URL', payload: tabs[0].url});
      });
  }, [customTitle, dispatch]);
  return (
    <section className={styles.container}>
      <h2 className={styles.h2}>Title</h2>
      <textarea
        className={styles.textarea}
        defaultValue={state.title}
        onChange={(e): void => {
          setCustomTitle(e?.target.value);
        }}
      />
      <PopupTabs />
      {state.activeTab === 'shortcut' && <ShortcutTab />}
      {state.activeTab === 'space' && <SpaceTab />}
      <PopupButtons />
    </section>
  );
};

export default Popup;
