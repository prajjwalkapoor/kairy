import React, { useState, useRef, useEffect } from 'react'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import { Shortcut } from '../../reducers/types'
import styles from './styles.module.scss'
interface IShortcutCardProps {
	shortcut: Shortcut
}
const ShortcutCard: React.FC<IShortcutCardProps> = ({ shortcut }) => {
	const [isCardMenuVisible, setIsCardMenuVisible] = useState(false)
	var domain = shortcut.url
		.slice(shortcut.url.indexOf('//') + 2, shortcut.url.indexOf('.com') + 16)
		.slice(0, 18)
	// const favIconChecker = async (url: string) => {
	// 	let res = await fetch(url)
	// 	if (res.status == 200) {
	// 		return url
	// 	} else return '../assets/icons/default-favicon.png'
	// }

	let shortcutMenuRef = useRef() as React.MutableRefObject<HTMLInputElement>
	useEffect(() => {
		document.addEventListener('mousedown', (e) => {
			if (!shortcutMenuRef.current?.contains(e.target as Node)) {
				setIsCardMenuVisible(false)
			}
		})
	})
	return (
		<div ref={shortcutMenuRef} className={`${styles.shortcutCard} ${styles.b3}`}>
			<div className='bg-div' style={{ opacity: '0' }}></div>
			{
				<div
					className={styles.cardMenuIcon}
					onClick={() => setIsCardMenuVisible(!isCardMenuVisible)}
				>
					<svg
						width='4'
						height='16'
						viewBox='0 0 4 16'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4ZM2 6C0.9 6 0 6.9 0 8C0 9.1 0.9 10 2 10C3.1 10 4 9.1 4 8C4 6.9 3.1 6 2 6ZM0 14C0 12.9 0.9 12 2 12C3.1 12 4 12.9 4 14C4 15.1 3.1 16 2 16C0.9 16 0 15.1 0 14Z'
							fill='#171F24'
						/>
					</svg>
				</div>
			}
			<div className={styles.cardDesc}>
				<div className={styles.logoContainer}>
					<img src={shortcut.icon} />
				</div>
				<div
					className={`${styles.cardMenuDropdown} ${
						isCardMenuVisible ? styles.visible : styles.hide
					}`}
				>
					<p
					// onClick={() => {
					// 	let pinShortcut
					// 	let filteredShortcutList = shortcutList.filter((item) => {
					// 		if (item.id == shortcut.id) pinShortcut = shortcut
					// 		return item.id !== shortcut.id
					// 	})
					// 	filteredShortcutList.unshift(pinShortcut)
					// 	setShortcutList(filteredShortcutList)
					// 	chrome.storage.sync.set({
					// 		shortcut: filteredShortcutList,
					// 	})

					// 	setIsCardMenuVisible(false)
					// }}
					>
						Pin
					</p>
					<p>Edit</p>
					<p
					// onClick={() => {
					// 	let filteredShortcutList = shortcutList.filter((item) => {
					// 		return item.id !== shortcut.id
					// 	})
					// 	chrome.storage.sync.set({ shortcut: filteredShortcutList })
					// 	setShortcutList(filteredShortcutList)
					// 	setIsCardMenuVisible(false)
					// }}
					>
						Delete
					</p>
				</div>
				<Tippy
					content={<span className={styles.tooltip}>{shortcut.title}</span>}
					placement='right-end'
					arrow={false}
				>
					<h1>{shortcut.title.slice(0, 10)}</h1>
				</Tippy>
				<Tippy
					content={<span className={styles.tooltip}>{shortcut.url}</span>}
					placement='right-end'
					arrow={false}
				>
					<a href={shortcut.url}>{domain}..</a>
				</Tippy>
			</div>
		</div>
	)
}
export default ShortcutCard
