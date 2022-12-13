import React, {useContext, useEffect, useState} from 'react';
import {browser} from 'webextension-polyfill-ts';
import {ContextProvider} from '../../context/context';
import styles from './SelectCategory.module.scss';

const SelectCategory: React.FC = () => {
  const {state, dispatch} = useContext(ContextProvider);
  const [category, setCategory] = useState('all');
  const [newCategory, setNewCategory] = useState('');
  const [categoryList, setCategoryList] = useState<string[]>([]);
  useEffect(() => {
    browser.storage.local.get().then((res) => {
      if (state.activeTab === 'shortcut') {
        res.shortcutCategoryList && setCategoryList(res.shortcutCategoryList);
      } else if (state.activeTab === 'space') {
        res.spaceCategoryList && setCategoryList(res.spaceCategoryList);
      }
    });
  }, [state.activeTab]);
  useEffect(() => {
    if (category == '')
      dispatch({type: 'SET_IS_SUBMIT_DISABLED', payload: true});
    if (category === 'addNew') {
      categoryList.includes(newCategory) || newCategory == ''
        ? dispatch({type: 'SET_IS_SUBMIT_DISABLED', payload: true})
        : dispatch({type: 'SET_IS_SUBMIT_DISABLED', payload: false});
      dispatch({type: 'SET_CATEGORY', payload: newCategory});
    } else {
      dispatch({type: 'SET_IS_SUBMIT_DISABLED', payload: false});
      dispatch({type: 'SET_CATEGORY', payload: category});
    }
  }, [category, newCategory, dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.selectContainer}>
        <h2 className={styles.h2}>Add to </h2>
        <div className={styles.selectWrapper}>
          <select
            className={styles.select}
            name='shortcutCategory'
            onChange={(e): void => setCategory(e.target.value)}
          >
            <option value='all' defaultChecked>
              All Tiles
            </option>
            {categoryList.map((item: string) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
            <option value='addNew'>Add New Category....</option>
          </select>
        </div>
      </div>
      {category === 'addNew' && (
        <div className={styles.newCategory}>
          <h2 className={styles.h2}>New category name</h2>
          <input
            className={styles.newCategoryInput}
            onChange={(e): void => {
              setNewCategory(e?.target.value);
            }}
            type='text'
          />
          {categoryList.includes(newCategory) && (
            <p className={styles.error}>Category already exists</p>
          )}
        </div>
      )}
    </div>
  );
};
export default SelectCategory;
