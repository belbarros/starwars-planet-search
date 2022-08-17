import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SWProvider from './context/SWProvider';

ReactDOM.render(
  <SWProvider>
    <App />
  </SWProvider>,
  document.getElementById('root'),
);
