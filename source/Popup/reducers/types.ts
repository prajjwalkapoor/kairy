interface Shortcut {
	id: string
	title: string
	url: string
	icon: string
	category: string
}
interface Reading {
	id: string
	title: string
	url: string
	icon: string
	tags: string[]
	category: string
}
export interface IState {
	title: string
	url: string
	shortcut: Shortcut
	reading: Reading
	shortcutList: Array<Shortcut>
	readingList: Array<Reading>
	readingTags: Array<string>
	shortcutCategories: Array<string>
	readingCategories: Array<string>
	activeTab: 'shortcut' | 'reading'
}
export interface IAction {
	type:
		| 'SET_TITLE'
		| 'SET_URL'
		| 'SET_SHORTCUT'
		| 'SET_READING'
		| 'SET_SHORTCUT_LIST'
		| 'SET_READING_LIST'
		| 'SET_READING_TAGS'
		| 'SET_SHORTCUT_CATEGORIES'
		| 'SET_READING_CATEGORIES'
		| 'SET_ACTIVE_TAB'
	payload: any
}
