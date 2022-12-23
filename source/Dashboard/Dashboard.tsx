import React, { useEffect, useState } from 'react'
import CategoryDropdownHeader from './components/CategoryDropdownHeader'
import HeaderButtons from './components/HeaderButtons'
import { Onboarding } from './components/Onboarding'
import SearchBar from './components/SearchBar'
import ShortcutSection from './components/ShortcutSection'
import styles from './dashboard.module.scss'

const Dashboard: React.FC = () => {
	const [onboarding, setOnboarding] = useState<boolean | undefined>(undefined)
	useEffect(() => {
		if (!localStorage.getItem('kairy.theme')) {
			document.querySelector(':root')!.setAttribute('theme', 'light')
		} else {
			document
				.querySelector(':root')!
				.setAttribute('theme', localStorage.getItem('kairy.theme')!)
		}

		if (localStorage.getItem('onboarding') === 'true') {
			setOnboarding(true)
		} else {
			setOnboarding(false)
		}
	}, [])

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
		)
	}
	if (onboarding === false)
		return (
			<div className={styles.dashboard}>
				<Onboarding setOnboarding={setOnboarding} />
			</div>
		)
	else return <div></div>
}

export default Dashboard
