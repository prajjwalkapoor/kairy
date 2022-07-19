import * as React from 'react';
import styles from './dashboard.module.scss';

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1 className={styles.h1}>Dashboard only</h1>
    </div>
  );
};

export default Dashboard;
