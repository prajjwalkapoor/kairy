import * as React from 'react';
// import { browser, Tabs } from "webextension-polyfill-ts";
import styles from './popup.module.scss';
// function openWebPage(url: string): Promise<Tabs.Tab> {
//   return browser.tabs.create({ url });
// }

const Popup: React.FC = () => {
  return (
    <section>
      <h1 className={styles.h1}>Popup</h1>
    </section>
  );
};

export default Popup;
