import React, {useContext, useEffect} from 'react';
import {ContextProvider} from '../../context/context';
import styles from './SpaceTags.module.scss';

const SpaceTags: React.FC = () => {
  const {dispatch} = useContext(ContextProvider);
  const [tags, setTags] = React.useState<string[]>([]);
  useEffect(() => {
    dispatch({type: 'SET_SPACE_TAGS', payload: tags});
  }, [tags, dispatch]);
  const removeTagData = (indexToRemove: number): void => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };
  const addTagData = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    const element = event.target as HTMLInputElement;
    if (element.value !== '') {
      const string = element.value;
      const newTags = string.split(',');
      setTags([...tags, ...newTags]);
      element.value = '';
    }
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>Add Tags</h2>
      <input
        className={styles.input}
        type='text'
        placeholder='Add comma separated tags'
        onKeyUp={(event): void =>
          event.key === 'Enter' ? addTagData(event) : undefined
        }
      />
      <ul className={styles.tags}>
        {tags.map((tag, index) => (
          <li key={index} className={styles.tag}>
            <span className={styles.tagTitle}>{tag}</span>
            <span
              className={styles.tagCloseIcon}
              onClick={(): void => removeTagData(index)}
            >
              x
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default SpaceTags;
