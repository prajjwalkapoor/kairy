import { IAction, IState } from './types'

export const initialState: IState = {
	title: '',
	url: '',
	shortcut: {
		id: '',
		title: '',
		url: '',
		icon: '',
		category: '',
	},
	reading: {
		id: '',
		title: '',
		url: '',
		icon: '',
		tags: [],
		category: '',
	},
	shortcutList: [],
	readingList: [],
	readingTags: [],
	shortcutCategories: [],
	readingCategories: [],
	activeTab: 'shortcut',
}

export const reducer = (state: IState, action: IAction): IState => {
	switch (action.type) {
		case 'SET_TITLE':
			return {
				...state,
				title: action.payload,
			}
		case 'SET_URL':
			return {
				...state,
				url: action.payload,
			}
		case 'SET_SHORTCUT':
			return {
				...state,
				shortcut: action.payload,
			}
		case 'SET_READING':
			return {
				...state,
				reading: action.payload,
			}
		case 'SET_SHORTCUT_LIST':
			return {
				...state,
				shortcutList: action.payload,
			}
		case 'SET_READING_LIST':
			return {
				...state,
				readingList: action.payload,
			}
		case 'SET_READING_TAGS':
			return {
				...state,
				readingTags: action.payload,
			}
		case 'SET_SHORTCUT_CATEGORIES':
			return {
				...state,
				shortcutCategories: action.payload,
			}
		case 'SET_READING_CATEGORIES':
			return {
				...state,
				readingCategories: action.payload,
			}
		case 'SET_ACTIVE_TAB':
			return {
				...state,
				activeTab: action.payload,
			}
		default:
			return state
	}
}
