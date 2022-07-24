import React, {useEffect, useState} from 'react';
import {browser} from 'webextension-polyfill-ts';
import useTheme from '../utils/customHooks/useTheme';
import styles from './dashboard.module.scss';

const Dashboard: React.FC = () => {
  const {toggleTheme} = useTheme();
  const [data, setData] = useState({});
  useEffect(() => {
    browser.storage.local.get().then((res) => setData(res));
  }, []);
  const clickHandler = (): void => {
    toggleTheme();
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Dashboard only</h1>
      <button type='button' onClick={clickHandler}>
        Change Theme
      </button>
      <p className={styles.p}>{JSON.stringify(data)}</p>
    </div>
  );
};

export default Dashboard;
