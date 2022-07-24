import React from 'react';
import SelectCategory from '../SelectCategory/SelectCategory';
import styles from './ShortcutTab.module.scss';

const ShortcutTab: React.FC = () => {
  return (
    <section className={styles.container}>
      <SelectCategory />
    </section>
  );
};
export default ShortcutTab;
