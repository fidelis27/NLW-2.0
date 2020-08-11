import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import { useAuth } from '../contexts/auth';

const Routes: React.FC = () => {
  const { signed } = useAuth();
  return (
    <BrowserRouter>{signed ? <AuthRoutes /> : <AppRoutes />}</BrowserRouter>
  );
};

export default Routes;
