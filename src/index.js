import React from 'react';
import ReactDOM from 'react-dom';
import 'lib-flexible';
import AppRouter from './router';
import { ThemeProvider } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  typography: {
    htmlFontSize: 37.5,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AppRouter />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
