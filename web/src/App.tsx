import React from 'react';
import './assets/styles/global.css';
import AppProvider from './hooks';

import Routes from './routes';

const App: React.FC = () => {
  return (
    <>
      <AppProvider>
        <div className="App">
          <Routes />
        </div>
      </AppProvider>
    </>
  );
};

export default App;
