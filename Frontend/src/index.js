import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SignUp from './js/SignUp.js';
import reportWebVitals from './reportWebVitals';
import Globals from './js/Globals.js';

export const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  
    <SignUp />
  </React.StrictMode>
);

Globals();


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();