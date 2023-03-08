import React from 'react';
import styles from './styles.module.scss';

interface IOnboardingScreenProps {
  setCurrentScreen: React.Dispatch<React.SetStateAction<number>>;
}
export const OnboardingScreenOne: React.FC<IOnboardingScreenProps> = ({
  setCurrentScreen,
}) => {
  return (
    <div className={styles.screenOne}>
      <div className={styles.info}>
        <h2>Are you ready to be organized?</h2>
        <p>
          Kairy is about giving you a place to capture and collect the things
          you find all across the web that fascinate you. Here is the small
          tutorial video to get you started.
        </p>
        <button
          onClick={() => {
            setCurrentScreen(2);
          }}
        >
          NEXT
        </button>
      </div>
      <div className={styles.tutorial}>
        <img
          className={styles.video}
          src='https://media.giphy.com/media/3o7TKsQ8U6U6ZsY6Oc/giphy.gif'
        />
      </div>
    </div>
  );
};
