import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'
import MuiThemeProvider from '../node_modules/material-ui/styles/MuiThemeProvider';

const Index = () => (
  <MuiThemeProvider>
    <App/>
  </MuiThemeProvider>
);

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);
