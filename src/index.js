import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';

import store from './redux/store'
import { IconContext } from 'react-icons';

ReactDOM.render(
  <React.StrictMode>
    <IconContext.Provider value={{color: '#0a477b', className:"react-icon", size:"2.5em"}}>
      <Provider store={store}>
        <App />
      </Provider>
    </IconContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
