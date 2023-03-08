export const getDomain = (url: string): string => {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url.split('//')[1].split('/')[0];
  }
  return url.split('/')[0];
};

export const getDomainName = (url: string): string => {
  const domain = getDomain(url);
  return domain.startsWith('www.') ? domain.split('www.')[1] : domain;
};
