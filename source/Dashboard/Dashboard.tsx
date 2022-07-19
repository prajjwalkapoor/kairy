import * as React from 'react';
import useTheme from '../utils/customHooks/useTheme';
import styles from './dashboard.module.scss';

const Dashboard: React.FC = () => {
  const {toggleTheme} = useTheme();
  const clickHandler = (): void => {
    toggleTheme();
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Dashboard only</h1>
      <p
        className={styles.h1}
        role="button"
        tabIndex={0}
        onClick={clickHandler}
      >
        change theme
      </p>
    </div>
  );
};

export default Dashboard;
