import React, { useContext, useState } from 'react'
import styles from './styles.module.scss'
import defaultShortcutJSON from './shortcutList.json'
import { ContextProvider } from '../../context/context'
import { browser } from 'webextension-polyfill-ts'
interface IOnboardingScreenProps {
	setCurrentScreen: React.Dispatch<React.SetStateAction<number>>
}
export const OnboardingScreenThree: React.FC<IOnboardingScreenProps> = ({
	setCurrentScreen,
}) => {
	const { dispatch } = useContext(ContextProvider)
	const [defaultShortcuts, setdefaultShortcuts] = useState(defaultShortcutJSON)
	const buttonhandler = () => {
		setCurrentScreen(3)
		const shortcut_list: any[] = []
		const shortcut_category_list: string[] = []
		defaultShortcuts.forEach((shortcut) => {
			if (shortcut.isSelected) {
				shortcut_list.push(shortcut.shortcut)
				if (shortcut_category_list.includes(shortcut.shortcut.category)) {
					return
				}
				shortcut_category_list.push(shortcut.shortcut.category)
			}
		})
		console.log(shortcut_list)
		console.log(shortcut_category_list)
		dispatch({ type: 'SET_SHORTCUT_LIST', payload: shortcut_list })
		dispatch({
			type: 'SET_SHORTCUT_CATEGORY_LIST',
			payload: shortcut_category_list,
		})
		browser.storage.local.set({
			shortcutCategoryList: shortcut_category_list,
		})

		localStorage.setItem('onboarding', 'true')
		setCurrentScreen(4)
	}
	return (
		<div className={styles.screenThree}>
			<p className={styles.introPara}>
				Kairy can save any link from any website but here are some websites that you
				might want to add to your list.
			</p>
			<div className={styles.sites}>
				{defaultShortcuts.map((site) => {
					return (
						<div
							className={`${styles.site} ${site.isSelected ? styles.selected : ''}`}
							onClick={() => {
								setdefaultShortcuts(
									defaultShortcuts.map((shortcut) => {
										if (shortcut.shortcut.id == site.shortcut.id) {
											shortcut.isSelected = !shortcut.isSelected
										}
										return shortcut
									})
								)
							}}
						>
							<img src={site.shortcut.icon} alt={site.shortcut.title} />
							<p>{site.shortcut.title}</p>
						</div>
					)
				})}
			</div>
			<button onClick={buttonhandler}>Let's Go!</button>
		</div>
	)
}
