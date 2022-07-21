import React, { createContext, useEffect, useReducer } from 'react'
import { initialState, reducer } from '../reducers/reducer'
import { ContextProps, ContextValueProps } from './types'

export const ContextProvider = createContext<ContextValueProps>({
	state: initialState,
	dispatch: () => {},
})
const ContextProvide = ({ children }: ContextProps): JSX.Element => {
	const setTheme = (): void => {
		const theme = localStorage.getItem('kairy.theme')
		console.log(theme)
		if (theme) {
			const root = document.querySelector(':root')!
			root.setAttribute('theme', theme)
		}
	}
	const [state, dispatch] = useReducer(reducer, initialState)
	useEffect(() => {
		setTheme()
	}, [])
	return (
		<ContextProvider.Provider value={{ state, dispatch }}>
			{children}
		</ContextProvider.Provider>
	)
}

export default ContextProvide
