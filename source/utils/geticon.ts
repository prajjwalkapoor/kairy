export const getIcon = (url: string): string => {
  const domain = url.split('//')[1].split('/')[0]
  const icon = `https://www.google.com/s2/favicons?domain=${domain}`
  fetch(icon).then((res) => {
    if (res.status === 404) {
      return 'https://www.google.com/s2/favicons?domain=google.com'
    } else {
      return icon
    }
  })
  return icon
}