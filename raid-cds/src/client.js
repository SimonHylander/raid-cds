import App from './App';
import {BrowserRouter} from 'react-router-dom';
import React from 'react';
import {hydrate} from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from '../../src/store/configureStore.js';
import client from './api/warcraftlogs/client.js';

const store = configureStore(window.__PRELOADED_STATE__);

hydrate(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

client.configure();

if (module.hot) {
  module.hot.accept();
}