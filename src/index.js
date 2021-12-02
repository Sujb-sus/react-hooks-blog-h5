import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import 'lib-flexible';
import AppRouter from './router';
import store from './redux/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
