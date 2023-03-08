import Tippy from '@tippyjs/react';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {browser} from 'webextension-polyfill-ts';
import {ContextProvider} from '../../context/context';
import {Shortcut} from '../../reducers/types';
import AddCustomShortcut from '../AddCustomShortcut';
import styles from './styles.module.scss';

interface IProps {
  title: string;
  content: string;

  index: number;
}

const Accordion: React.FC<IProps> = (props) => {
  const [active, setActive] = useState(props?.index == 0);
  const {state, dispatch} = useContext(ContextProvider);
  const content: any = useRef(null);
  const [height, setHeight] = useState('0px');
  const [isAddShortcutVisible, setIsAddShortcutVisible] = useState(false);
  const [isEditShortcutVisible, setIsEditShortcutVisible] = useState(false);
  const [selectedShortcut, setSelectedShortcut] = useState<Shortcut | null>(
    null
  );

  useEffect(() => {
    setHeight(active ? `${content.current?.scrollHeight}px` : '0px');
  }, []);

  function toggleAccordion() {
    setActive(!active);
    setHeight(active ? '0px' : `${content.current?.scrollHeight}px`);
  }
  const changeCategoryTitle = (oldName: string, newName: string) => {
    const shortcutList = state.shortcutList.map((item) => {
      if (item.category == oldName) {
        item.category = newName;
      }
      return item;
    });

    const categoryList = state.shortcutCategoryList.map((item) => {
      if (item == oldName) {
        item = newName;
      }
      return item;
    });

    dispatch({type: 'SET_SHORTCUT_LIST', payload: shortcutList});
    dispatch({type: 'SET_SHORTCUT_CATEGORY_LIST', payload: categoryList});
    browser.storage.local.set({
      shortcutCategoryList: categoryList,
      shortcutList,
    });
  };
  const handleEditShortcut = (shortcut: Shortcut) => {
    console.log(shortcut, 'clicked shortcut');
    setSelectedShortcut(shortcut);
    setIsEditShortcutVisible(true);
  };
  return (
    <>
      {isAddShortcutVisible && (
        <AddCustomShortcut setIsAddShortcutVisible={setIsAddShortcutVisible} />
      )}
      {selectedShortcut !== null && isEditShortcutVisible && (
        <AddCustomShortcut
          setIsAddShortcutVisible={setIsEditShortcutVisible}
          shortcutData={selectedShortcut}
        />
      )}

      <div className={styles.accordionSection}>
        <div className={`${styles.accordion} ${active ? styles.active : ''}`}>
          <div className={styles.icon} onClick={toggleAccordion}>
            <span className={styles.accordionIcon}>{active ? '-' : '+'}</span>
          </div>

          <div className={styles.titleHeader}>
            <Tippy
              content={
                <span className={styles.tooltip}>
                  Double click to Edit {props.title}
                </span>
              }
              placement='bottom-start'
              arrow={false}
            >
              <input
                type='text'
                className={styles.accordionTitle}
                defaultValue={props.title}
                readOnly
                onDoubleClick={(e) => {
                  e.currentTarget.readOnly = false;
                  e.currentTarget.classList.add(styles.selectedInput);
                }}
                onBlur={(e) => {
                  e.currentTarget.readOnly = true;
                  e.currentTarget.classList.remove(styles.selectedInput);
                  changeCategoryTitle(props.title, e.target.value);
                }}
              />
            </Tippy>
          </div>
        </div>
        <div
          ref={content}
          style={{maxHeight: `${height}`}}
          className={styles.accordionContent}
        >
          <div className={styles.accordionText}>
            {state.shortcutList.map((shortcut, index) => {
              if (shortcut.category == props.title) {
                return (
                  <div key={index}>
                    <Tippy
                      content={
                        <span className={styles.tooltip}>
                          Edit {shortcut.title}
                        </span>
                      }
                      placement='right-end'
                      arrow={false}
                    >
                      <div
                        className={styles.shortcutItem}
                        onClick={() => {
                          handleEditShortcut(shortcut);
                        }}
                      >
                        <img src={shortcut.icon} />
                        <p>{shortcut.title}</p>
                      </div>
                    </Tippy>
                  </div>
                );
              }
              return null;
            })}

            <div
              className={styles.shortcutItem}
              onClick={() => {
                setIsAddShortcutVisible(true);
              }}
            >
              <p>+</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accordion;
