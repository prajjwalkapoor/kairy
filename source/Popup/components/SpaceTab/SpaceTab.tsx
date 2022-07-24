import React from 'react';
import SelectCategory from '../SelectCategory/SelectCategory';
import SpaceTags from '../SpaceTags/SpaceTags';
import styles from './SpaceTab.module.scss';

const SpaceTab: React.FC = () => {
  return (
    <div className={styles.container}>
      <SelectCategory />
      <SpaceTags />
    </div>
  );
};
export default SpaceTab;
