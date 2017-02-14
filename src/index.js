import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept();
}
