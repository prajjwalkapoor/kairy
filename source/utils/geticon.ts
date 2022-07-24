export const getIcon = (url: string): string => {
  const domain = url.split('//')[1].split('/')[0];
  const icon = `https://www.google.com/s2/favicons?domain=${domain}`;
  return icon;
};
