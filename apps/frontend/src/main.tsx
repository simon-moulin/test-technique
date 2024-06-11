import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') ?? document.body
);

root.render(
  <StrictMode>
    <App/>
  </StrictMode>
);
