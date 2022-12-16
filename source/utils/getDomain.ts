export const getDomain = (url: string): string => {
	if (url.startsWith('http://') || url.startsWith('https://')) {
		return url.split('//')[1].split('/')[0]
	} else {
		return url.split('/')[0]
	}
}
