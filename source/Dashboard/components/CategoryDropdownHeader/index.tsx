import React, {useContext, useEffect, useRef, useState} from 'react';
import {browser} from 'webextension-polyfill-ts';
import Tippy from '@tippyjs/react';
import styles from './styles.module.scss';
import {ContextProvider} from '../../context/context';
import AddCustomShortcut from '../AddCustomShortcut';
import {Shortcut} from '../../reducers/types';
import {ManageCategories} from '../ManageCategories';

const CategoryDropdownHeader: React.FC = () => {
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isAddShortcutVisible, setIsAddShortcutVisible] = useState(false);
  const [isSortDropdownVisible, setIsSortDropdownVisible] = useState(false);
  const [isManageCategoryVisible, setIsManageCategoryVisible] = useState(false);
  const {state, dispatch} = useContext(ContextProvider);
  const categoryDropdownRef =
    useRef() as React.MutableRefObject<HTMLInputElement>;

  const sortDropdownRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  useEffect(() => {
    document.addEventListener('mousedown', (event) => {
      if (!categoryDropdownRef.current?.contains(event.target as Node)) {
        setIsCategoryDropdownOpen(false);
      }
    });

    document.addEventListener('mousedown', (event) => {
      if (!sortDropdownRef.current?.contains(event.target as Node)) {
        setIsSortDropdownVisible(false);
      }
    });

    return () => {
      document.removeEventListener('mousedown', (event) => {
        if (!categoryDropdownRef.current?.contains(event.target as Node)) {
          setIsCategoryDropdownOpen(false);
        }
      });

      document.removeEventListener('mousedown', (event) => {
        if (!sortDropdownRef.current?.contains(event.target as Node)) {
          setIsSortDropdownVisible(false);
        }
      });
    };
  }, []);

  const SortHandler = (sortBy: string) => {
    let sortedArr: Shortcut[] = [];
    if (sortBy === 'alphabetical') {
      sortedArr = state.mapper.sort((a: Shortcut, b: Shortcut) => {
        if (a.title[0].toLowerCase() < b.title[0].toLowerCase()) {
          return -1;
        }
        if (a.title[0].toLowerCase() > b.title[0].toLowerCase()) {
          return 1;
        }
        return 0;
      });
    } else if (sortBy === 'date') {
      sortedArr = state.mapper.sort((a: Shortcut, b: Shortcut) => {
        if (a.modifiedOn > b.modifiedOn) {
          return -1;
        }
        if (a.modifiedOn < b.modifiedOn) {
          return 1;
        }
        return 0;
      });
    }
    dispatch({
      type: 'SET_MAPPER',
      payload: sortedArr,
    });
  };
  return (
    <>
      {isAddShortcutVisible && (
        <>
          <AddCustomShortcut
            setIsAddShortcutVisible={setIsAddShortcutVisible}
          />
        </>
      )}
      {isManageCategoryVisible && (
        <>
          <ManageCategories
            setIsManageCategoryVisible={setIsManageCategoryVisible}
          />
        </>
      )}
      <div className={styles.container}>
        <div className={styles.categoryDropdown} ref={categoryDropdownRef}>
          <div
            className={styles.categoryTab}
            onClick={() => {
              setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
            }}
          >
            <p className={styles.selectedCatMenu}>
              {!state.activeShortcutCategory ||
              state.activeShortcutCategory === 'all'
                ? 'All Categories'
                : state.activeShortcutCategory}
            </p>
            <svg
              width='32'
              height='32'
              viewBox='0 0 32 32'
              fill='none'
              className={`${styles.dropIcon} ${
                isCategoryDropdownOpen ? styles.rotate180 : styles.rotate0
              }`}
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M9.88 11.0601L16 17.1667L22.12 11.0601L24 12.9401L16 20.9401L8 12.9401L9.88 11.0601Z'
                fill='#153246'
              />
            </svg>
          </div>
          <div
            className={`${styles.categoryTabDropdown} ${
              isCategoryDropdownOpen
                ? styles.catDropVisible
                : styles.catDropHidden
            }`}
          >
            <p
              className={`${styles.categoryItem} ${
                !state.activeShortcutCategory && styles.selectedCat
              }`}
              onClick={() => {
                dispatch({
                  type: 'SET_ACTIVE_SHORTCUT_CATEGORY',
                  payload: 'all',
                });
                browser.storage.local.set({
                  activeShortcutCategory: 'all',
                });

                setIsCategoryDropdownOpen(false);
              }}
            >
              All Categories
            </p>
            {state.shortcutCategoryList.map((item) => {
              item == 'all' && (item = 'All Categories');
              return (
                <p
                  key={item}
                  className={styles.categoryItem}
                  onClick={() => {
                    browser.storage.local.set({activeShortcutCategory: item});
                    dispatch({
                      type: 'SET_ACTIVE_SHORTCUT_CATEGORY',
                      payload: item,
                    });
                    browser.storage.local.set({
                      activeShortcutCategory: item,
                    });
                    setIsCategoryDropdownOpen(false);
                  }}
                >
                  {item}
                </p>
              );
            })}
            <p
              className={styles.manageCategory}
              onClick={() => {
                setIsManageCategoryVisible(true);
                setIsCategoryDropdownOpen(false);
              }}
            >
              Manage Category
            </p>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Tippy
            content={<span className={styles.tooltip}>Add new shortcut</span>}
            placement='left-end'
            arrow={false}
          >
            <button
              onClick={() => setIsAddShortcutVisible(true)}
              className={styles.buttonIcons}
            >
              <svg
                width='16'
                height='16'
                viewBox='0 0 16 16'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <g clipPath='url(#clip0_3269_1020)'>
                  <path d='M2.20696 4.41396C2.20696 4.26763 2.26509 4.1273 2.36856 4.02383C2.47203 3.92037 2.61236 3.86224 2.75869 3.86224H12.6897V3.31051C12.6897 3.16419 12.6316 3.02385 12.5281 2.92039C12.4247 2.81692 12.2843 2.75879 12.138 2.75879H1.65524C1.50891 2.75879 1.36858 2.81692 1.26511 2.92039C1.16164 3.02385 1.10352 3.16419 1.10352 3.31051V10.4829C1.10352 10.6293 1.16164 10.7696 1.26511 10.8731C1.36858 10.9765 1.50891 11.0347 1.65524 11.0347H2.20696V4.41396Z' />
                  <path d='M3.86227 4.96533H14.345C14.4914 4.96533 14.6317 5.02346 14.7352 5.12693C14.8386 5.2304 14.8968 5.37073 14.8968 5.51706V12.6895C14.8968 12.8358 14.8386 12.9761 14.7352 13.0796C14.6317 13.1831 14.4914 13.2412 14.345 13.2412H3.86227C3.71594 13.2412 3.57561 13.1831 3.47214 13.0796C3.36867 12.9761 3.31055 12.8358 3.31055 12.6895V5.51706C3.31055 5.37073 3.36867 5.2304 3.47214 5.12693C3.57561 5.02346 3.71594 4.96533 3.86227 4.96533Z' />
                  <path
                    d='M15.9997 13.643C16.2758 13.643 16.4997 13.4192 16.4997 13.143V12.1906C16.4997 11.9145 16.2758 11.6906 15.9997 11.6906H13.6425V9.3335C13.6425 9.05735 13.4187 8.8335 13.1425 8.8335H12.1902C11.914 8.8335 11.6902 9.05735 11.6902 9.3335V11.6906H9.33301C9.05687 11.6906 8.83301 11.9145 8.83301 12.1906V13.143C8.83301 13.4192 9.05687 13.643 9.33301 13.643H11.6902V16.0002C11.6902 16.2763 11.914 16.5002 12.1902 16.5002H13.1425C13.4187 16.5002 13.6425 16.2763 13.6425 16.0002V13.643H15.9997Z'
                    strokeLinejoin='round'
                    stroke='black'
                    strokeWidth={0.25}
                  />
                </g>
                <defs>
                  <clipPath id='clip0_3269_1020'>
                    <rect width='16' height='16' />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </Tippy>
          <Tippy
            content={<span className={styles.tooltip}>Sort shortcuts</span>}
            placement='left-end'
            arrow={false}
          >
            <button
              className={`${styles.buttonIcons} ${styles.sortBtn}`}
              onClick={() => setIsSortDropdownVisible(!isSortDropdownVisible)}
            >
              <svg
                width='16'
                height='16'
                viewBox='0 0 16 16'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M2 3.6665C2 3.11422 2.44771 2.6665 3 2.6665H13C13.5523 2.6665 14 3.11422 14 3.6665C14 4.21879 13.5523 4.6665 13 4.6665H3C2.44771 4.6665 2 4.21879 2 3.6665ZM2 7.6665C2 7.11424 2.44771 6.6665 3 6.6665H10.3333C10.8856 6.6665 11.3333 7.11424 11.3333 7.6665C11.3333 8.21877 10.8856 8.6665 10.3333 8.6665H3C2.44771 8.6665 2 8.21877 2 7.6665ZM3 10.6665C2.44771 10.6665 2 11.1142 2 11.6665C2 12.2188 2.44771 12.6665 3 12.6665H7.66667C8.21893 12.6665 8.66667 12.2188 8.66667 11.6665C8.66667 11.1142 8.21893 10.6665 7.66667 10.6665H3Z' />
              </svg>
              {isSortDropdownVisible && (
                <div
                  ref={sortDropdownRef}
                  className={`${styles.cardMenuDropdown} ${
                    isSortDropdownVisible ? styles.visible : styles.hide
                  }`}
                >
                  <div className={styles.itemContainer}>
                    <p
                      onClick={() => {
                        SortHandler('date');
                      }}
                    >
                      Date Modified
                    </p>
                    <p
                      onClick={() => {
                        SortHandler('alphabetical');
                      }}
                    >
                      Alphabetical
                    </p>
                  </div>
                </div>
              )}
            </button>
          </Tippy>
        </div>
      </div>
    </>
  );
};
export default CategoryDropdownHeader;
