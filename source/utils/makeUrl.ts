export const makeUrl = (url: string): string => {
	if (url.startsWith('http://') || url.startsWith('https://')) {
		return url
	} else {
		return `https://${url}`
	}
}
