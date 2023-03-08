import React, { useContext, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './styles.module.scss';
import { ContextProvider } from '../../context/context';
import Accordion from '../Accordion';

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

interface IProps {
  setIsManageCategoryVisible: (value: boolean) => void;
}
export const ManageCategories: React.FC<IProps> = ({
  setIsManageCategoryVisible,
}) => {
  const { state, dispatch } = useContext(ContextProvider);
  const [newCategory, setNewCategory] = useState('');
  const [isAddCategoryVisible, setIsAddCategoryVisible] = useState(false);
  const mainRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const addCategoryRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  useEffect(() => {
    function handleClickOutsideMain(event: any) {
      if (mainRef.current && !mainRef.current.contains(event.target)) {
        setIsManageCategoryVisible(false);
      }
    }
    function handleClickOutsideAddCategory(event: any) {
      if (
        addCategoryRef.current &&
        !addCategoryRef.current.contains(event.target)
      ) {
        setIsAddCategoryVisible(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutsideMain);
    document.addEventListener('mousedown', handleClickOutsideAddCategory);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideMain);
      document.removeEventListener('mousedown', handleClickOutsideAddCategory);
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
        <div className={styles.header}>
          {isAddCategoryVisible && (
            <div className={styles.addCategoryContainer} ref={addCategoryRef}>
              <input
                type='text'
                placeholder='Enter category name'
                className={styles.addCategoryInput}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <button
                className={styles.addCategoryBtn}
                onClick={() => {
                  if (newCategory) {
                    dispatch({
                      type: 'SET_SHORTCUT_CATEGORY_LIST',
                      payload: [...state.shortcutCategoryList, newCategory],
                    });
                    setIsAddCategoryVisible(false);
                  }
                }}
              >
                Add
              </button>
            </div>
          )}
          <h1 className={styles.headerTitle}>Manage Categories</h1>
          <button
            className={styles.addNewCategoryBtn}
            onClick={() => {
              setIsAddCategoryVisible(true);
            }}
          >
            + Add Category
          </button>
        </div>
        {state.shortcutCategoryList.map((category, index) => {
          return (
            <div key={index + category}>
              <Accordion
                title={category}
                content='This is for content'
                index={index}
              />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};
