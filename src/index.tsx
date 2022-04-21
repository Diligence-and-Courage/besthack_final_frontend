import './index.scss';

import { initializeIcons } from '@fluentui/react/lib/Icons';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App/App';
import store from './store';

initializeIcons();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
