import React, {useContext, useEffect, useState} from 'react';
import {ContextProvider} from '../../context/context';
import ShortcutCard from '../ShortcutCard';
import styles from './styles.module.scss';

const ShortcutSection: React.FC = () => {
  const {state, dispatch} = useContext(ContextProvider);
  const [isTasksVisible] = useState(false);
  useEffect(() => {
    if (state.activeShortcutCategory === 'all') {
      dispatch({type: 'SET_MAPPER', payload: state.shortcutList});
    } else {
      const filteredArr = state.shortcutList.filter(
        (shortcut) => shortcut.category === state.activeShortcutCategory
      );
      dispatch({type: 'SET_MAPPER', payload: filteredArr});
    }

    console.log('changed with active category');
  }, [state.activeShortcutCategory, state.shortcutList]);

  return (
    <div
      className={`${styles.shortcutContainer} ${
        isTasksVisible ? styles.halfGrid : styles.fullGrid
      }`}
    >
      {state.shortcutList &&
        state.mapper.map((item) => {
          return <ShortcutCard key={item.id} shortcut={item} />;
        })}
    </div>
  );
};
export default ShortcutSection;
