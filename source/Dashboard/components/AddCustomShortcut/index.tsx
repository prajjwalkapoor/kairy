import {nanoid} from 'nanoid';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {motion} from 'framer-motion';
import {browser} from 'webextension-polyfill-ts';
import {makeUrl} from '../../../utils/makeUrl';
import {ContextProvider} from '../../context/context';
import {Shortcut} from '../../reducers/types';
import ShortcutCard from '../ShortcutCard';
import styles from './styles.module.scss';

const variants = {
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: 30,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

interface IAddCustomShortcutProps {
  // setstate type
  setIsAddShortcutVisible: React.Dispatch<React.SetStateAction<boolean>>;
  shortcutData?: Shortcut;
}
const AddCustomShortcut: React.FC<IAddCustomShortcutProps> = ({
  setIsAddShortcutVisible,
  shortcutData,
}) => {
  const {state, dispatch} = useContext(ContextProvider);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('all');
  const [id, setId] = useState(nanoid());
  const [icon, setIcon] = useState('');
  const [isPinned, setIsPinned] = useState(false);
  const mainRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  useEffect(() => {
    console.log('shortcutData', shortcutData);

    if (shortcutData) {
      setTitle(shortcutData.title);
      setUrl(shortcutData.url);
      setCategory(shortcutData.category);
      setId(shortcutData.id);
      setIcon(shortcutData.icon);
      setIsPinned(shortcutData.isPinned);
    }

    function handleClickOutside(event: any) {
      if (mainRef.current && !mainRef.current.contains(event.target)) {
        setIsAddShortcutVisible(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  // useEffect(() => {
  // 	setIcon(getIcon(url))
  // }, [url])

  const saveHandler = () => {
    if (title && url && category) {
      const updatedShortcut: Shortcut = {
        title,
        url: makeUrl(url),
        id,
        category,
        icon: icon || `https://www.google.com/s2/favicons?domain=${url}`,
        modifiedOn: new Date().getTime().toString(),
        isPinned,
      };
      if (shortcutData) {
        const newShortcutList = state.shortcutList.map((shortcut) => {
          if (shortcut.id === shortcutData.id) {
            return updatedShortcut;
          }
          return shortcut;
        });
        dispatch({
          type: 'SET_SHORTCUT_LIST',
          payload: newShortcutList,
        });
        browser.storage.local.set({shortcutList: newShortcutList});
      } else {
        dispatch({
          type: 'SET_SHORTCUT_LIST',
          payload: [...state.shortcutList, updatedShortcut],
        });
        browser.storage.local.set({
          shortcutList: [...state.shortcutList, updatedShortcut],
        });
      }
      setIsAddShortcutVisible(false);
    }
  };

  return (
    <div className={styles.container}>
      <motion.div
        variants={variants}
        initial='exit'
        animate='enter'
        exit='exit'
        className={styles.main}
        ref={mainRef}
      >
        <h1 className={styles.headerTitle}>
          {shortcutData ? 'Edit Shortcut' : 'Create Shortcut'}
        </h1>
        <div className={styles.createShortcut}>
          <form action=''>
            <h2>Title</h2>
            <input
              type='text'
              className={styles.titleInput}
              placeholder="Shortcut's title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <h2>URL</h2>
            <input
              type='url'
              className={styles.urlInput}
              placeholder="Shortcut's URL"
              onChange={(e) => setUrl(e.target.value)}
              value={url}
            />
            <select
              name='shortcutCategory'
              id='shortcat'
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value='all' defaultChecked>
                All Categories
              </option>
              {state.shortcutCategoryList.map((category) => {
                return (
                  category !== 'all' && (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  )
                );
              })}
            </select>
          </form>
          <div className={styles.preview}>
            <ShortcutCard
              shortcut={{
                title: title || 'Demo Title',
                url: url || 'https://www.example.com/',
                id,
                category,
                icon:
                  icon ||
                  `https://www.google.com/s2/favicons?domain_url=${url}`,
                modifiedOn: new Date().getTime().toString(),
                isPinned: false,
              }}
              isPreview
            />
          </div>
        </div>
        <div className={styles.btns}>
          <button
            onClick={() => {
              setIsAddShortcutVisible(false);
            }}
            className={styles.cancelBtn}
          >
            Cancel
          </button>
          <button
            className={styles.saveBtn}
            onClick={saveHandler}
            disabled={!title || !url}
          >
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AddCustomShortcut;
