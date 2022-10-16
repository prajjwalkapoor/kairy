import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'
import { browser } from 'webextension-polyfill-ts'
import { ContextProvider } from '../../context/context'
const CategoryDropdown: React.FC = () => {
	const [categories, setCategories] = useState<string[]>([])
	const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false)
	const { state, dispatch } = useContext(ContextProvider)
	useEffect(() => {
		browser.storage.local.get().then((res) => {
			if (res.activeShortcutCategory) {
				dispatch({
					type: 'SET_ACTIVE_SHORTCUT_CATEGORY',
					payload: res.activeShortcutCategory,
				})
			}
			res.shortcutCategoryList && setCategories(res.shortcutCategoryList)
		})
	}, [])
	let categoryDropdownRef = useRef() as React.MutableRefObject<HTMLInputElement>
	useEffect(() => {
		document.addEventListener('mousedown', (event) => {
			if (!categoryDropdownRef.current?.contains(event.target as Node)) {
				setIsCategoryDropdownOpen(false)
			}
		})
	}, [])

	return (
		<div className={styles.categoryDropdown} ref={categoryDropdownRef}>
			<div
				className={styles.categoryTab}
				onClick={() => {
					setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
				}}
			>
				<p className={styles.selectedCatMenu}>
					{!state.activeShortcutCategory
						? 'All Categories'
						: state.activeShortcutCategory}
				</p>
				<svg
					width='32'
					height='32'
					viewBox='0 0 32 32'
					fill='none'
					className={`${styles.dropIcon} ${
						isCategoryDropdownOpen ? styles.rotate180 : styles.rotate0
					}`}
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M9.88 11.0601L16 17.1667L22.12 11.0601L24 12.9401L16 20.9401L8 12.9401L9.88 11.0601Z'
						fill='#153246'
					/>
				</svg>
			</div>
			<div
				className={`${styles.categoryTabDropdown} ${
					isCategoryDropdownOpen ? styles.catDropVisible : styles.catDropHidden
				}`}
			>
				<p
					className={`${styles.categoryItem} ${
						!state.activeShortcutCategory && styles.selectedCat
					}`}
					onClick={() => {
						dispatch({
							type: 'SET_ACTIVE_SHORTCUT_CATEGORY',
							payload: 'All Categories',
						})
						browser.storage.local.set({
							activeShortcutCategory: 'All Categories',
						})

						setIsCategoryDropdownOpen(false)
					}}
				>
					{state.activeShortcutCategory != 'All Categories'
						? 'All Categories'
						: state.activeShortcutCategory}
				</p>
				{categories.map((item) => {
					return (
						<p
							key={item}
							className={styles.categoryItem}
							onClick={() => {
								browser.storage.local.set({ activeShortcutCategory: item })
								dispatch({ type: 'SET_ACTIVE_SHORTCUT_CATEGORY', payload: item })
								setIsCategoryDropdownOpen(false)
							}}
						>
							{item}
						</p>
					)
				})}
				<p
					className={styles.manageCategory}
					onClick={() => {
						// manageCategoryElement.classList.toggle('visible')
						// manageCategoryElementBg.classList.toggle('visible')
						// setIsCategoryDropdownOpen(false)
					}}
				>
					Manage Category
				</p>
			</div>
		</div>
	)
}
export default CategoryDropdown
