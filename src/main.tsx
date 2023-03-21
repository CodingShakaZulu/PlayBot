import React from 'react';
import ReactDOM from 'react-dom/client';

import { AppComponent } from './App';

const rootElem = document.getElementById('root')

if(rootElem) {
  const root = ReactDOM.createRoot(rootElem);
  root.render(
    <React.StrictMode>
      <AppComponent/>
    </React.StrictMode>
  );
} else {
  throw new Error("Could not find element #root");
}