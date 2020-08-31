import React from 'react';
import './assets/styles/global.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppProvider from './hooks';

import Routes from './routes';

const App: React.FC = () => {
  return (
    <>
      <Router>
        <AppProvider>
          <div className="App">
            <Routes />
          </div>
        </AppProvider>
      </Router>
    </>
  );
};

export default App;
