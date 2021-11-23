import React from 'react';
import ReactDOM from 'react-dom';
import 'lib-flexible';
import AppRouter from './router';

ReactDOM.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
  document.getElementById('root')
);
