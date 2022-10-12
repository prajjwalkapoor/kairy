import React, { useContext, useEffect, useState } from 'react'
import { ContextProvider } from '../../context/context'
import { Shortcut } from '../../reducers/types'
import ShortcutCard from '../ShortcutCard'
import styles from './styles.module.scss'
const ShortcutSection: React.FC = () => {
	const { state } = useContext(ContextProvider)
	const [isTasksVisible] = useState(false)
	const [mapper, setMapper] = useState<Shortcut[]>([])
	useEffect(() => {
		if (state.activeShortcutCategory === 'All Categories') {
			setMapper(state.shortcutList)
		} else {
			setMapper(
				state.shortcutList.filter(
					(shortcut) => shortcut.category === state.activeShortcutCategory
				)
			)
		}

		console.log(state.activeShortcutCategory, 'state.activeShortcutCategory')
	}, [state])

	return (
		<div
			className={`${styles.shortcutContainer} ${
				isTasksVisible ? styles.halfGrid : styles.fullGrid
			}`}
		>
			{state.shortcutList &&
				mapper.map((item) => {
					return <ShortcutCard key={item.id} shortcut={item} />
				})}
		</div>
	)
}
export default ShortcutSection
