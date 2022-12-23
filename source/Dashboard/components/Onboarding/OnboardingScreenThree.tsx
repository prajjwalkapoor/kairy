import React from 'react'
// import styles from './styles.module.scss'
interface IOnboardingScreenProps {
	setCurrentScreen: React.Dispatch<React.SetStateAction<number>>
}
export const OnboardingScreenThree: React.FC<IOnboardingScreenProps> = (
	{
		// setCurrentScreen,
	}
) => {
	const buttonhandler = () => {}
	return (
		<div>
			<h1>Onboarding Screen 3</h1>
			<button onClick={buttonhandler}>Let's Go!</button>
		</div>
	)
}
