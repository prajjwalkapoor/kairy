export const getIcon = (url: string): string => {
  const domain = url && url.split('//')[1].split('/')[0];
  const icon = `https://www.google.com/s2/favicons?domain=${domain}`;
  fetch(icon).then((res) => {
    if (res.status !== 200) {
      return 'https://www.google.com/s2/favicons?domain=kairy.vercel.app';
    }
    return icon;
  });
  return icon;
};
