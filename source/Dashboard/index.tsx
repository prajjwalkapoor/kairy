import * as React from 'react';
import ReactDOM from 'react-dom';
// import { browser } from 'webextension-polyfill-ts'
import App from './App';
// browser.storage.local.clear()
ReactDOM.render(<App />, document.getElementById('dashboard-root'));
