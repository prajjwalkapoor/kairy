import React, {useState, useRef, useEffect, useContext} from 'react';
import Tippy from '@tippyjs/react';
import {browser} from 'webextension-polyfill-ts';
import {Shortcut} from '../../reducers/types';
import styles from './styles.module.scss';
import {ContextProvider} from '../../context/context';
import AddCustomShortcut from '../AddCustomShortcut';

interface IShortcutCardProps {
  shortcut: Shortcut;
  isPreview?: boolean;
}
const ShortcutCard: React.FC<IShortcutCardProps> = ({shortcut, isPreview}) => {
  const [isCardMenuVisible, setIsCardMenuVisible] = useState(false);
  const [isEditShortcutVisible, setIsEditShortcutVisible] = useState(false);
  const {state, dispatch} = useContext(ContextProvider);
  const [isNewTabLink, setIsNewTabLink] = useState('_self');
  const domain = shortcut.url
    .slice(shortcut.url.indexOf('//') + 2, shortcut.url.indexOf('.com') + 16)
    .slice(0, 18);

  const shortcutMenuRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    if (state.preferences?.urlNewTab) {
      setIsNewTabLink('_blank');
    } else {
      setIsNewTabLink('_self');
    }
  }, [state.preferences.urlNewTab]);
  useEffect(() => {
    document.addEventListener('mousedown', (e) => {
      if (!shortcutMenuRef.current?.contains(e.target as Node)) {
        setIsCardMenuVisible(false);
      }
    });
  });
  // console.log(isEditShortcutVisible)
  const handleDeleteShortcut = () => {
    const filteredShortcutList = state.shortcutList.filter((item) => {
      return item.id !== shortcut.id;
    });
    browser.storage.local.set({shortcutList: filteredShortcutList});
    dispatch({type: 'SET_SHORTCUT_LIST', payload: filteredShortcutList});
    browser.storage.local.set({shortcutList: filteredShortcutList});
    setIsCardMenuVisible(false);
  };

  const pinShortcutHandler = () => {
    const pinnedArr = state.shortcutList.map((item) => {
      if (item.id === shortcut.id) {
        item.isPinned = !item.isPinned;
      }
      return item;
    });
    dispatch({type: 'SET_SHORTCUT_LIST', payload: pinnedArr});
    browser.storage.local.set({shortcutList: pinnedArr});
    setIsCardMenuVisible(false);
  };

  const unpinnedShortcutHandler = () => {
    const unpinnedArr = state.shortcutList.map((item) => {
      if (item.id === shortcut.id) {
        item.isPinned = !item.isPinned;
      }
      return item;
    });
    dispatch({type: 'SET_SHORTCUT_LIST', payload: unpinnedArr});
    browser.storage.local.set({shortcutList: unpinnedArr});
    setIsCardMenuVisible(false);
  };

  const editHandler = () => {
    setIsEditShortcutVisible(true);
    setIsCardMenuVisible(false);
  };
  return (
    <>
      {isEditShortcutVisible && (
        <AddCustomShortcut
          shortcutData={shortcut}
          setIsAddShortcutVisible={setIsEditShortcutVisible}
        />
      )}
      <div
        ref={shortcutMenuRef}
        className={`${styles.shortcutCard} ${styles.b3}`}
      >
        <div className='bg-div' style={{opacity: '0'}} />
        {!isPreview && (
          <div
            className={styles.cardMenuIcon}
            onClick={() => setIsCardMenuVisible(!isCardMenuVisible)}
          >
            <svg
              width='4'
              height='16'
              viewBox='0 0 4 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4ZM2 6C0.9 6 0 6.9 0 8C0 9.1 0.9 10 2 10C3.1 10 4 9.1 4 8C4 6.9 3.1 6 2 6ZM0 14C0 12.9 0.9 12 2 12C3.1 12 4 12.9 4 14C4 15.1 3.1 16 2 16C0.9 16 0 15.1 0 14Z'
                fill='#171F24'
              />
            </svg>
          </div>
        )}
        {shortcut.isPinned && (
          <div className={styles.pinIcon}>
            <svg
              width='27'
              height='39'
              viewBox='0 0 27 39'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M26.625 21.1313C26.625 20.25 25.9875 19.5375 25.125 19.2938C23.9391 18.9666 22.8933 18.2593 22.1481 17.2804C21.403 16.3016 20.9996 15.1052 21 13.875V4.5H22.875C23.9062 4.5 24.75 3.65625 24.75 2.625C24.75 1.59375 23.9062 0.75 22.875 0.75H4.125C3.09375 0.75 2.25 1.59375 2.25 2.625C2.25 3.65625 3.09375 4.5 4.125 4.5H6V13.875C6 16.4625 4.25625 18.6375 1.875 19.2938C1.0125 19.5375 0.375 20.25 0.375 21.1313V21.375C0.375 22.4062 1.21875 23.25 2.25 23.25H11.5875L11.625 36.375C11.625 37.4062 12.4688 38.25 13.5 38.25C14.5312 38.25 15.375 37.4062 15.375 36.375L15.3375 23.25H24.75C25.7812 23.25 26.625 22.4062 26.625 21.375V21.1313Z'
              />
            </svg>
          </div>
        )}
        <div className={styles.cardDesc}>
          <div className={styles.logoContainer}>
            <img src={shortcut.icon} />
          </div>
          <div
            className={`${styles.cardMenuDropdown} ${
              isCardMenuVisible ? styles.visible : styles.hide
            }`}
          >
            {shortcut.isPinned ? (
              <p onClick={unpinnedShortcutHandler}>Unpin</p>
            ) : (
              <p onClick={pinShortcutHandler}>Pin</p>
            )}
            <p onClick={editHandler}>Edit</p>
            <p onClick={handleDeleteShortcut}>Delete</p>
          </div>
          <Tippy
            content={<span className={styles.tooltip}>{shortcut.title}</span>}
            placement='right-end'
            arrow={false}
          >
            <h1>{shortcut.title.slice(0, 10)}</h1>
          </Tippy>
          <Tippy
            content={<span className={styles.tooltip}>{shortcut.url}</span>}
            placement='right-end'
            arrow={false}
          >
            <a href={shortcut.url} target={isNewTabLink}>
              {domain}..
            </a>
          </Tippy>
        </div>
      </div>
    </>
  );
};
export default ShortcutCard;
