import React from 'react'
import styles from './styles.module.scss'
const SearchBar: React.FC = () => {
	return (
		<div className={styles.searchContainer}>
			<input
				className={styles.searchInput}
				type='text'
				placeholder='Search Shortcuts'
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
		</div>
	)
}
export default SearchBar
