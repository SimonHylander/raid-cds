import App from './App';
import React from 'react';
import {StaticRouter} from 'react-router-dom';
import {renderToString} from 'react-dom/server';
import {Provider} from 'react-redux';
import express from 'express';
import bodyParser from 'body-parser';
import qs from 'qs';
import configureStore from './store/configureStore.js';
import routes from './server/api';
import {getTemplate, getReport} from './server/pages'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const server = express();

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .use(bodyParser.urlencoded({express: true}))
  .use(bodyParser.json())
  .use('/api', routes())
  // .use('/', pages())
  /*.get('/reports/:reportCode', async (req, res) => {
    console.log('TEST');
    const params = qs.parse(req.params);
    const queries = qs.parse(req.query);
    const {reportCode} = params;

    const report = await getReport(reportCode);
    console.log(report);

    const preloadedState = {
      report: report
    };

    const context = {};
    const store = configureStore(preloadedState);
    const finalState = store.getState();

    const markup = renderToString(
      <Provider store={store}>
        <StaticRouter context={context} location={req.url}>
          <App />
        </StaticRouter>
      </Provider>
    );

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(getTemplate(assets, markup, finalState));
    }
  })*/
  .get('/*', (req, res) => {
    const params = qs.parse(req.query);
    const preloadedState = {};
    const context = {};
    const store = configureStore(preloadedState);
    const finalState = store.getState();

    const markup = renderToString(
      <Provider store={store}>
        <StaticRouter context={context} location={req.url}>
          <App />
        </StaticRouter>
      </Provider>
    );

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(getTemplate(assets, markup, finalState));
    }
  });

export default server;
