import React from 'react';
import './assets/styles/global.css';
import { AuthProvider } from './contexts/auth';

import Routes from './routes';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="App">
        <Routes />
      </div>
    </AuthProvider>
  );
};

export default App;
