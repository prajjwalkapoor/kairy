import {nanoid} from 'nanoid';
import {browser} from 'webextension-polyfill-ts';
import {getDomainName} from '../utils/getDomain';
import {getIcon} from '../utils/geticon';

const createSubmenu = async () => {
  const categoryList = await browser.storage.local.get('shortcutCategoryList');
  await categoryList.shortcutCategoryList.forEach((category: string) => {
    browser.contextMenus.create({
      id: category,
      title: category,
      contexts: ['link', 'selection'],
      parentId: 'kairy-link',
    });
  });
};

browser.contextMenus.create({
  id: 'kairy-link',
  title: 'Save to Kairy',
  contexts: ['link'],
});
browser.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local' && changes.shortcutCategoryList) {
    createSubmenu();
  }
});

// listen for context menu click
browser.contextMenus.onClicked.addListener((info: any, tab) => {
  if (info.parentMenuItemId === 'kairy-link') {
    console.log(info, tab);
    const shortcut = {
      id: nanoid(),
      title: getDomainName(info.linkUrl),
      url: info.linkUrl,
      category: info.parentMenuItemId,
      icon: getIcon(info.linkUrl),
      modifiedOn: new Date().getTime().toString(),
    };
    browser.storage.local.get('shortcutList').then((result) => {
      const {shortcutList} = result;
      shortcutList.push(shortcut);
      browser.storage.local.set({shortcutList});
    });
  }
});
