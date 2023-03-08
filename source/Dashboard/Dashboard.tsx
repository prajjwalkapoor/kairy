import React, {useEffect, useState} from 'react';
import CategoryDropdownHeader from './components/CategoryDropdownHeader';
import HeaderButtons from './components/HeaderButtons';
import {Onboarding} from './components/Onboarding';
import SearchBar from './components/SearchBar';
import ShortcutSection from './components/ShortcutSection';
import styles from './dashboard.module.scss';
import 'tippy.js/dist/tippy.css';
import {browser} from 'webextension-polyfill-ts';

const Dashboard: React.FC = () => {
  const [onboarding, setOnboarding] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    browser.storage.local.get('preferences').then((res) => {
      if (res.preferences?.theme) {
        document
          .querySelector(':root')!
          .setAttribute('theme', res.preferences.theme);
      } else {
        document.querySelector(':root')!.setAttribute('theme', 'light');
      }
    });

    if (localStorage.getItem('onboarding') === 'true') {
      setOnboarding(true);
    } else {
      setOnboarding(false);
    }
  }, []);

  if (onboarding === true) {
    return (
      <div className={styles.dashboard}>
        <header>
          <SearchBar />
          <HeaderButtons />
        </header>
        <main>
          <CategoryDropdownHeader />
          <ShortcutSection />
        </main>
      </div>
    );
  }
  if (onboarding === false)
    return (
      <div className={styles.dashboard}>
        <Onboarding setOnboarding={setOnboarding} />
      </div>
    );
  return <div />;
};

export default Dashboard;
