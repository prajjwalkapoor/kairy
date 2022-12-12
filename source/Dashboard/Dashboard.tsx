import React from 'react'
import useTheme from '../utils/customHooks/useTheme'
import CategoryDropdown from './components/CategoryDropdown/'
import SearchBar from './components/SearchBar'
import ShortcutSection from './components/ShortcutSection/'
import styles from './dashboard.module.scss'

const Dashboard: React.FC = () => {
	const { toggleTheme } = useTheme()
	const clickHandler = (): void => {
		toggleTheme()
	}
	return (
		<div className={styles.dashboard}>
			<header>
				<SearchBar />
				<div className={styles.headerIcons}>
					<button className={styles.themebtn} onClick={clickHandler}>
						Theme
					</button>
				</div>
			</header>
			<main>
				<CategoryDropdown />
				<ShortcutSection />
			</main>
		</div>
	)
}

export default Dashboard
