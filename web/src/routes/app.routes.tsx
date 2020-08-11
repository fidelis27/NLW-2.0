import React from 'react';
import { Route } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ErrorAuth from '../pages/ErrorAuth';

const AppRoutes: React.FC = () => {
  return (
    <>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/give-classes" component={ErrorAuth} />
      <Route path="/study" component={ErrorAuth} />
    </>
  );
};

export default AppRoutes;
