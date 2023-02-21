import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import './index.css';
import App from './App.js';

import reportWebVitals from './reportWebVitals';
import Globals from './js/Globals.js';
import Landing from './js/Landing.js';

export const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <HashRouter>
    <App />
	</HashRouter>
  </React.StrictMode>
);

if(window.localStorage.getItem( 'labelId')==null)
	window.localStorage.setItem( 'labelId','1');

if(window.localStorage.getItem( 'currentViewName')==null)
	window.localStorage.setItem( 'currentViewName','Month');

Globals();


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
