import React, {useContext, useEffect, useRef, useState} from 'react';
import {browser} from 'webextension-polyfill-ts';
import {ContextProvider} from '../../context/context';
import styles from './styles.module.scss';

const SearchBar: React.FC = () => {
  const [searchSource, setSearchSource] = useState('Shortcuts');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSourceDropdownVisible, setIsSourceDropdownVisible] = useState(false);
  const [isSearchDropdownVisible, setIsSearchDropdownVisible] = useState(false);
  const [googleSearchData, setGoogleSearchData] = useState([] as string[]);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const {state, dispatch} = useContext(ContextProvider);
  const searchSourceData = ['Shortcuts', 'Google', 'Bing', 'DuckDuckGo'];
  const noOfSearchQueryResults = 5;

  const sourceDropdownRef =
    useRef() as React.MutableRefObject<HTMLInputElement>;
  const searchDropdownRef =
    useRef() as React.MutableRefObject<HTMLInputElement>;
  useEffect(() => {
    document.addEventListener('mousedown', (event) => {
      if (!sourceDropdownRef.current?.contains(event.target as Node)) {
        setIsSourceDropdownVisible(false);
      }
    });
    document.addEventListener('mousedown', (event) => {
      if (!searchDropdownRef.current?.contains(event.target as Node)) {
        setIsSearchDropdownVisible(false);
      }
    });

    return () => {
      document.removeEventListener('mousedown', (event) => {
        if (!sourceDropdownRef.current?.contains(event.target as Node)) {
          setIsSourceDropdownVisible(false);
        }
      });
      document.removeEventListener('mousedown', (event) => {
        if (!searchDropdownRef.current?.contains(event.target as Node)) {
          setIsSearchDropdownVisible(false);
        }
      });
    };
  }, []);
  useEffect(() => {
    setSearchSource(state.preferences.searchSource);
  }, [state.preferences.searchSource]);
  useEffect(() => {
    if (searchSource == 'Shortcuts') {
      searchShortcutHandler();
    } else {
      googleSearchQueryHandler();
    }
  }, [searchQuery]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      focusedIndex == -1
        ? searchNavigationHandler(searchQuery)
        : searchNavigationHandler(googleSearchData[focusedIndex]);
      setFocusedIndex(-1);
    }
    if (e.key == 'ArrowDown') {
      setFocusedIndex((prev) => {
        return (prev + 1) % noOfSearchQueryResults;
      });
    }
    if (e.key == 'ArrowUp') {
      setFocusedIndex((prev) => {
        return (prev + noOfSearchQueryResults - 1) % 5;
      });
    }
    if (e.key == 'Escape') {
      isSearchDropdownVisible && setIsSearchDropdownVisible(false);
      setFocusedIndex(-1);
    }
  };

  const searchShortcutHandler = () => {
    const filteredSearchArray = state.shortcutList.filter((shortcut) =>
      shortcut.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (searchQuery === '') {
      let filteredArr = state.shortcutList.filter(
        (shortcut) => shortcut.category === state.activeShortcutCategory
      );
      if (filteredArr.length === 0) {
        filteredArr = state.shortcutList;
      }
      dispatch({type: 'SET_MAPPER', payload: filteredArr});
    } else {
      dispatch({
        type: 'SET_MAPPER',
        payload: filteredSearchArray,
      });
    }
  };
  const googleSearchQueryHandler = () => {
    fetch(
      `http://suggestqueries.google.com/complete/search?client=chrome&q=${searchQuery}`
    )
      .then((res) => res.json())
      .then((data) =>
        setGoogleSearchData(data[1].slice(0, noOfSearchQueryResults))
      );
  };
  const searchNavigationHandler = (query: string) => {
    if (searchSource == 'Google') {
      window.open(`https://www.google.com/search?q=${query}`, '_self');
    } else if (searchSource == 'Bing') {
      window.open(`https://www.bing.com/search?q=${query}`, '_self');
    } else if (searchSource == 'DuckDuckGo') {
      window.open(`https://duckduckgo.com/?q=${query}`, '_self');
    }
  };

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.searchInput}
        type='text'
        placeholder={`Search anything on ${searchSource}`}
        onKeyDown={handleKeyDown}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          e.target.value == '' || searchSource == 'Shortcuts'
            ? setIsSearchDropdownVisible(false)
            : setIsSearchDropdownVisible(true);
        }}
      />
      <svg
        className={styles.searchIcon}
        width='28'
        height='28'
        viewBox='0 0 32 32'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M20.6667 18.6667H19.6133L19.24 18.3067C20.5467 16.7867 21.3333 14.8133 21.3333 12.6667C21.3333 7.88 17.4533 4 12.6667 4C7.88 4 4 7.88 4 12.6667C4 17.4533 7.88 21.3333 12.6667 21.3333C14.8133 21.3333 16.7867 20.5467 18.3067 19.24L18.6667 19.6133V20.6667L25.3333 27.32L27.32 25.3333L20.6667 18.6667V18.6667ZM12.6667 18.6667C9.34667 18.6667 6.66667 15.9867 6.66667 12.6667C6.66667 9.34667 9.34667 6.66667 12.6667 6.66667C15.9867 6.66667 18.6667 9.34667 18.6667 12.6667C18.6667 15.9867 15.9867 18.6667 12.6667 18.6667Z' />
      </svg>
      <span
        className={styles.searchSource}
        onClick={() => {
          setIsSourceDropdownVisible(!isSourceDropdownVisible);
        }}
      >
        Search {searchSource}
        <svg
          width='32'
          height='32'
          viewBox='0 0 32 32'
          fill='none'
          className={`${styles.dropIcon} ${
            isSourceDropdownVisible ? styles.rotate180 : styles.rotate0
          }`}
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M9.88 11.0601L16 17.1667L22.12 11.0601L24 12.9401L16 20.9401L8 12.9401L9.88 11.0601Z' />
        </svg>
      </span>
      {isSourceDropdownVisible && (
        <div className={styles.searchSourceDropdown} ref={sourceDropdownRef}>
          {searchSourceData.map((source) => {
            return (
              <p
                key={source}
                onClick={() => {
                  setSearchSource(() => {
                    dispatch({
                      type: 'SET_PREFERENCES',
                      payload: {
                        ...state.preferences,
                        searchSource: source,
                      },
                    });
                    browser.storage.local.set({
                      preferences: {
                        ...state.preferences,
                        searchSource: source,
                      },
                    });
                    return source;
                  });
                  setIsSourceDropdownVisible(false);
                }}
              >
                {source}
              </p>
            );
          })}
        </div>
      )}
      {isSearchDropdownVisible && (
        <div className={styles.searchDropdown} ref={searchDropdownRef}>
          {googleSearchData.map((query, index) => {
            return (
              <p
                key={query}
                className={
                  focusedIndex === index
                    ? styles.focusedQuery
                    : styles.searchQuery
                }
                onClick={() => searchNavigationHandler(query)}
              >
                {query}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default SearchBar;
