import React from 'react';
import ReactDOM from 'react-dom';

import Application from './Application';
import { GrudeProvider } from './GrudeContext';

import './styles.css';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <GrudeProvider>
    <Application />
  </GrudeProvider>,
  rootElement
);
