import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {AppRouter} from './Router';
// import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <AppRouter />,
  document.getElementById('root') as HTMLElement
);
// registerServiceWorker();
