import React, { useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'
import { motion } from 'framer-motion'
import useTheme from '../../../utils/customHooks/useTheme'
interface ISettingsProps {
	onClose: React.Dispatch<React.SetStateAction<Boolean>>
}

const variants = {
	enter: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.2,
			ease: 'easeOut',
		},
	},
	exit: {
		opacity: 0,
		y: 30,
		transition: {
			duration: 0.3,
			ease: 'easeIn',
		},
	},
}

const Settings: React.FC<ISettingsProps> = ({ onClose }) => {
	const mainRef = useRef() as React.MutableRefObject<HTMLInputElement>
	const [currentTab, setCurrentTab] = useState('general')
	const { toggleTheme, theme } = useTheme()

	useEffect(() => {
		function handleClickOutside(event: any) {
			if (mainRef.current && !mainRef.current.contains(event.target)) {
				onClose(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])
	return (
		<div className={styles.container}>
			<motion.div
				variants={variants}
				initial='exit'
				animate='enter'
				exit='exit'
				className={styles.main}
				ref={mainRef}
			>
				<h1>Settings</h1>
				<div className={styles.mainContainer}>
					<div className={styles.menu}>
						<p
							onClick={() => {
								setCurrentTab('general')
							}}
						>
							General
						</p>
						<p
							onClick={() => {
								setCurrentTab('appearance')
							}}
						>
							Appearance
						</p>
						<p
							onClick={() => {
								setCurrentTab('about')
							}}
						>
							About kairy
						</p>
					</div>
					<div className={styles.mainContent}>
						{currentTab === 'general' && (
							<div className={styles.general}>
								<div className={styles.contentItem}>
									<p>Language</p>
									<select name='' id=''>
										<option value=''>English</option>
									</select>
								</div>
								<div className={styles.contentItem}>
									<p>Open URLs in new tab</p>
									<div className={styles.themeBtn}>
										<button className={theme === 'light' ? styles.active : ''}>On</button>
										<button className={theme === 'dark' ? styles.active : ''}>Off</button>
									</div>
								</div>
								<div className={styles.contentItem}>
									<p>Export your data as JSOn</p>
									<div className={styles.themeBtn}>
										<button className={theme === 'light' ? styles.active : ''}>
											Export
										</button>
									</div>
								</div>
							</div>
						)}
						{currentTab === 'appearance' && (
							<div className={styles.appearance}>
								<div className={styles.contentItem}>
									<p>Theme</p>
									<div className={styles.themeBtn}>
										<button
											className={theme === 'light' ? styles.active : ''}
											onClick={() => {
												theme === 'dark' && toggleTheme()
											}}
										>
											Light
										</button>
										<button
											className={theme === 'dark' ? styles.active : ''}
											onClick={() => {
												theme === 'light' && toggleTheme()
											}}
										>
											Dark
										</button>
									</div>
								</div>
							</div>
						)}
						{currentTab === 'about' && (
							<div className={styles.about}>
								<div className={styles.contentItem}>
									<p>
										Kairy is a chrome extension to manage your bookmark shortcuts and
										reading lists.
									</p>
								</div>
								<div className={styles.contentItem}>
									<p>Version 1.0.0</p>
								</div>
							</div>
						)}
					</div>
				</div>
			</motion.div>
		</div>
	)
}
export default Settings
