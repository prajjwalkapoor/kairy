import React from 'react'
// import styles from './styles.module.scss'
interface IOnboardingScreenProps {
	setCurrentScreen: React.Dispatch<React.SetStateAction<number>>
}
export const OnboardingScreenTwo: React.FC<IOnboardingScreenProps> = ({
	setCurrentScreen,
}) => {
	const buttonhandler = () => {
		setCurrentScreen(3)
	}
	return (
		<div>
			<h1>Onboarding Screen two</h1>
			<button onClick={buttonhandler}>Next</button>
		</div>
	)
}
