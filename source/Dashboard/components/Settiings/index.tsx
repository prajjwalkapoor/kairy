import React, {useContext, useEffect, useRef, useState} from 'react';
import {motion} from 'framer-motion';
import {browser} from 'webextension-polyfill-ts';
import styles from './styles.module.scss';
import useTheme from '../../../utils/customHooks/useTheme';
import {ContextProvider} from '../../context/context';

interface ISettingsProps {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

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

const Settings: React.FC<ISettingsProps> = ({onClose}) => {
  const mainRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [currentTab, setCurrentTab] = useState('general');
  const {toggleTheme, theme} = useTheme();
  const {state, dispatch} = useContext(ContextProvider);
  const handleImport = (e: any) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], 'UTF-8');
    fileReader.onloadend = (e) => {
      const jsonData = JSON.parse(e.target?.result as string);
      Object.keys(jsonData).forEach((key) => {
        if (key === 'preferences') {
          browser.storage.local.set({preferences: jsonData[key]});
          dispatch({type: 'SET_PREFERENCES', payload: jsonData[key]});
          browser.storage.local.set({preferences: jsonData[key]});
        } else if (key === 'shortcutList') {
          browser.storage.local.set({shortcutList: jsonData[key]});
          dispatch({type: 'SET_SHORTCUT_LIST', payload: jsonData[key]});
        } else if (key === 'shortcutCategoryList') {
          browser.storage.local.set({shortcutCategoryList: jsonData[key]});
          dispatch({
            type: 'SET_SHORTCUT_CATEGORY_LIST',
            payload: jsonData[key],
          });
        }
      });
      window.location.reload();
    };
  };
  const exportData = (data: any) => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(data)
    )}`;
    const link = document.createElement('a');
    link.href = jsonString;
    link.download = 'data.json';
    link.click();
  };
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (mainRef.current && !mainRef.current.contains(event.target)) {
        onClose(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
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
        <h1>Settings</h1>
        <div className={styles.mainContainer}>
          <div className={styles.menu}>
            <p
              onClick={() => {
                setCurrentTab('general');
              }}
            >
              General
            </p>
            <p
              onClick={() => {
                setCurrentTab('appearance');
              }}
            >
              Appearance
            </p>
            <p
              onClick={() => {
                setCurrentTab('about');
              }}
            >
              About kairy
            </p>
          </div>
          <div className={styles.mainContent}>
            {currentTab === 'general' && (
              <div className={styles.general}>
                <div className={styles.contentItem}>
                  <p>Open URLs in new tab</p>
                  <div className={styles.themeBtn}>
                    <button
                      className={
                        state.preferences?.urlNewTab ? styles.active : ''
                      }
                      onClick={() => {
                        dispatch({
                          type: 'SET_PREFERENCES',
                          payload: {
                            ...state.preferences,
                            urlNewTab: true,
                          },
                        });
                        browser.storage.local.set({
                          preferences: {
                            ...state.preferences,
                            urlNewTab: true,
                          },
                        });
                      }}
                    >
                      On
                    </button>
                    <button
                      className={
                        !state.preferences?.urlNewTab ? styles.active : ''
                      }
                      onClick={() => {
                        dispatch({
                          type: 'SET_PREFERENCES',
                          payload: {
                            ...state.preferences,
                            urlNewTab: false,
                          },
                        });
                        browser.storage.local.set({
                          preferences: {
                            ...state.preferences,
                            urlNewTab: false,
                          },
                        });
                      }}
                    >
                      Off
                    </button>
                  </div>
                </div>
                <div className={styles.contentItem}>
                  <p>Export your data as JSON</p>
                  <div className={styles.themeBtn}>
                    <button
                      className={theme === 'light' ? styles.active : ''}
                      onClick={() => {
                        browser.storage.local.get().then((data) => {
                          exportData(data);
                        });
                      }}
                    >
                      Export
                    </button>
                  </div>
                </div>

                <div className={styles.contentItem}>
                  <p>Import your JSON Data</p>
                  <div className={styles.themeBtn}>
                    <input
                      type='file'
                      accept='.json'
                      id='actual-btn'
                      hidden
                      onChange={handleImport}
                    />
                    <label htmlFor='actual-btn' className={styles.importBtn}>
                      Import
                    </label>
                  </div>
                </div>
              </div>
            )}
            {currentTab === 'appearance' && (
              <div className={styles.appearance}>
                <div className={styles.contentItem}>
                  <p>Theme</p>
                  <div className={styles.themeBtn}>
                    <button
                      className={theme === 'light' ? styles.active : ''}
                      onClick={() => {
                        theme === 'dark' && toggleTheme();
                      }}
                    >
                      Light
                    </button>
                    <button
                      className={theme === 'dark' ? styles.active : ''}
                      onClick={() => {
                        theme === 'light' && toggleTheme();
                      }}
                    >
                      Dark
                    </button>
                  </div>
                </div>
              </div>
            )}
            {currentTab === 'about' && (
              <div className={styles.about}>
                <div className={styles.contentItem}>
                  <p>
                    Kairy is a chrome extension to manage your bookmark
                    shortcuts and reading lists.
                  </p>
                </div>
                <div className={styles.contentItem}>
                  <p>Version 1.0.0</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
export default Settings;
